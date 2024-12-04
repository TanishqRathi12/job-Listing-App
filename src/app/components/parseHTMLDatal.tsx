import * as cheerio from 'cheerio';

const extractKeywords = (description: string, tags: Array<string> = []): Array<string> => {
  const keywordsFromDescription = description
    ?.match(/(?:\b\w+\b)/g) // Extract words
    ?.filter(word => word.length > 3) || []; // for Keeping words longer than 3 characters

  // Combine extracted keywords with tags and remove duplicates
  return Array.from(new Set([...keywordsFromDescription, ...tags]));
};

const parseJSONLDJobPosting = (jsonData: any): object | null => {
  try {
    if (jsonData['@type'] !== 'JobPosting') return null;
   // console.log(jsonData);

    const {
      title = 'N/A',
      hiringOrganization = {},
      applicantLocationRequirements = [],
      jobLocation = {},
      baseSalary = {},
      employmentType = 'N/A',
      description = 'N/A',
      validThrough = 'N/A',
    } = jsonData;

    const companyName = hiringOrganization?.name || 'N/A';
    const companyLogo = hiringOrganization?.logo || 'N/A';

    // Extract the location from applicantLocationRequirements
    const location =
      applicantLocationRequirements?.[0]?.name || false;

    const addressRegion = jobLocation[0]?.address?.addressCountry || false;
    const addressPostalCode = jobLocation?.address?.postalCode || 'N/A';
    const salary = baseSalary?.value
      ? `${baseSalary.value.minValue || 'N/A'}-${baseSalary.value?.maxValue || 'N/A'}`
      : 'N/A';

    // Extract keywords from description
    const keywords = extractKeywords(description);

    return {
      title,
      companyName,
      companyLogo,
      location,
      addressRegion,
      addressPostalCode,
      salary,
      employmentType,
      description,
      validThrough,
      keywords,
    };
  } catch (error) {
    console.error('Error parsing JSON-LD:', error);
    return null;
  }
};

export const parseHTMLData = (html: string): Array<object> => {
  const $ = cheerio.load(html); // Load HTML content
  const jobList: Array<object> = [];

  // Process JSON-LD Data
  $('script[type="application/ld+json"]').each((_, scriptElement) => {
    try {
      const jsonData = JSON.parse($(scriptElement).html() || '');
      const jobData = parseJSONLDJobPosting(jsonData);
      if (jobData) jobList.push(jobData);
    } catch (error) {
      console.error('Error parsing JSON-LD:', error);
    }
  });

  return jobList;
};
