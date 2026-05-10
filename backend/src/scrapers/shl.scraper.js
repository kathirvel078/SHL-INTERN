import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";

const BASE_URL = "https://www.shl.com";



/*
|--------------------------------------------------------------------------
| HELPER FUNCTIONS
|--------------------------------------------------------------------------
*/

const delay = (ms) => {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
};

const cleanText = (text) => {
  return text
    .replace(/\s+/g, " ")
    .trim();
};



/*
|--------------------------------------------------------------------------
| FETCH WITH RETRY
|--------------------------------------------------------------------------
*/

const fetchWithRetry = async (
  url,
  retries = 3
) => {
  for (
    let attempt = 1;
    attempt <= retries;
    attempt++
  ) {
    try {
      console.log(
        `Fetching: ${url}`
      );

      const response =
        await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",

            Accept:
              "text/html,application/xhtml+xml",

            "Accept-Language":
              "en-US,en;q=0.9",
          },

          timeout: 10000,
        });

      return response.data;
    } catch (error) {
      console.log(
        `Retry ${attempt} failed`
      );

      console.log(error.message);

      if (attempt === retries) {
        throw error;
      }

      await delay(2000);
    }
  }
};



/*
|--------------------------------------------------------------------------
| GET ASSESSMENT LINKS
|--------------------------------------------------------------------------
*/

const getAssessmentLinks = async () => {
  console.log(
    "Fetching catalog page..."
  );

  const html =
    await fetchWithRetry(
      `${BASE_URL}/solutions/products/product-catalog/`
    );

  // DEBUG HTML
  await fs.writeFile(
    "./debug.html",
    html
  );

  const $ = cheerio.load(html);

  const links = [];

  console.log(
    "Total anchor tags:",
    $("a").length
  );

  $("a").each((_, element) => {
    const href =
      $(element).attr("href");

    if (
      href &&
      href.includes(
        "/products/product-catalog/view/"
      )
    ) {
      const fullUrl =
        href.startsWith("http")
          ? href
          : `${BASE_URL}${href}`;

      links.push(fullUrl);
    }
  });

  const uniqueLinks = [
    ...new Set(links),
  ];

  console.log(
    `Filtered links: ${uniqueLinks.length}`
  );

  return uniqueLinks;
};



/*
|--------------------------------------------------------------------------
| PARSE SINGLE ASSESSMENT PAGE
|--------------------------------------------------------------------------
*/

const parseAssessmentPage =
  async (url) => {
    try {
      console.log(
        `Parsing: ${url}`
      );

      const html =
        await fetchWithRetry(url);

      // DEBUG SINGLE PAGE
      await fs.writeFile(
        "./assessment-debug.html",
        html
      );

      const $ = cheerio.load(html);

      console.log(
        "H1 count:",
        $("h1").length
      );

      console.log(
        "Paragraph count:",
        $("p").length
      );

      const name = cleanText(
        $("h1").first().text()
      );

     const paragraphs = [];

$("p").each((_, element) => {
  let text = cleanText(
    $(element).text()
  );

  text = text.replace(
    /If you choose to continue with your current browser.*?experience\./gi,
    ""
  );

  text = cleanText(text);

  if (text.length > 50) {
    paragraphs.push(text);
  }
});

const description =
  paragraphs.join(" ");

      // BASIC FILTERING
      if (
        !name ||
        description.length < 20
      ) {
        console.log(
          "Skipped invalid assessment"
        );

        return null;
      }

      return {
        name,
        url,
        description,
      };
    } catch (error) {
      console.error(`
Failed parsing: ${url}

Error: ${error.message}
`);

      return null;
    }
  };



/*
|--------------------------------------------------------------------------
| SCRAPE ENTIRE CATALOG
|--------------------------------------------------------------------------
*/

const scrapeSHLCatalog =
  async () => {
    const links =
      await getAssessmentLinks();

    console.log(
      `Found ${links.length} links`
    );

    const assessments = [];

    for (const link of links) {
      const assessment =
        await parseAssessmentPage(
          link
        );

      if (assessment) {
        assessments.push(
          assessment
        );
      }

      // RATE LIMIT
      await delay(1000);
    }

    return assessments;
  };



/*
|--------------------------------------------------------------------------
| SAVE DATASET
|--------------------------------------------------------------------------
*/

const saveDataset = async (
  data
) => {
  await fs.writeFile(
    "./src/data/shl_catalog.json",

    JSON.stringify(
      data,
      null,
      2
    )
  );

  console.log(
    "Dataset saved successfully"
  );
};



/*
|--------------------------------------------------------------------------
| MAIN FUNCTION
|--------------------------------------------------------------------------
*/

const main = async () => {
  try {
    const assessments =
      await scrapeSHLCatalog();

    await saveDataset(
      assessments
    );

    console.log(`
Saved ${assessments.length} assessments
`);
  } catch (error) {
    console.error(
      "SCRAPER FAILED"
    );

    console.error(error);
  }
};

main();