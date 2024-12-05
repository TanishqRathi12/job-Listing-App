import * as cheerio from 'cheerio';

// Utility function to extract keywords from the description
const extractKeywords = (description: string, tags: string[] = []): string[] => {
  const keywordsFromDescription = description
    ?.match(/\b\w{4,}\b/g) || [];  // Match words longer than 3 characters

  // Combine extracted keywords with provided tags and remove duplicates
  return Array.from(new Set([...keywordsFromDescription, ...tags]));
};

// Function to extract job posting details from JSON-LD
const parseJobPostingJSONLD = (jsonData: any): object | null => {
  if (jsonData['@type'] !== 'JobPosting') return null;

  const {
    title = 'N/A',
    hiringOrganization = {},
    applicantLocationRequirements = [],
    jobLocation = {},
    baseSalary = {},
    employmentType = 'N/A',
    description = 'N/A',
    validThrough = 'N/A',
    datePosted = 'N/A',
  } = jsonData;
 // console.log(jsonData);

  const companyName = hiringOrganization?.name || 'N/A';
  const companyLogo = hiringOrganization?.logo || 'N/A';
  const companyUrl = hiringOrganization?.url || 'N/A';

  const location = applicantLocationRequirements?.[0]?.name || 'REMOTE';
  const addressRegion = jobLocation?.[0]?.address?.addressCountry || 'N/A';
  const addressPostalCode = jobLocation?.[0]?.address?.postalCode || 'N/A';

  const salary = baseSalary?.value 
    ? `$${baseSalary.value.minValue || 'N/A'}-$${baseSalary.value?.maxValue || 'N/A'}`
    : 'N/A';

  // Extract keywords from description
  const keywords = extractKeywords(description);

  return {
    title,
    companyName,
    companyLogo,
    companyUrl,
    location,
    addressRegion,
    addressPostalCode,
    salary,
    employmentType,
    description,
    validThrough,
    keywords,
    datePosted,
  };
};

// Function to parse the HTML data and extract all job postings
export const parseHTMLData = (html: string): object[] => {
  const $ = cheerio.load(html); // Load the HTML content
  const jobList: object[] = [];

  // Extract and process JSON-LD data
  $('script[type="application/ld+json"]').each((_, scriptElement) => {
    const jsonData = parseJSONLDFromScript($(scriptElement).html() || undefined);
    if (jsonData) {
      const jobData = parseJobPostingJSONLD(jsonData);
      if (jobData) jobList.push(jobData);
    }
  });

 // console.log('Parsed job postings:', jobList);

  return jobList;
};

// Helper function to parse JSON-LD safely from the script tag
const parseJSONLDFromScript = (scriptContent: string | undefined): any | null => {
  try {
    return JSON.parse(scriptContent || '');
  } catch (error) {
    console.error('Error parsing JSON-LD:', error);
    return null;
  }
};

