import * as cheerio from 'cheerio';

export const parseHTMLData = (html: string) => {
  const $ = cheerio.load(html); // Load HTML content 
  const jsonData = $('script[type="application/ld+json"]').html();

  if (!jsonData) {
    console.error('No JSON-LD data found');
    return null;
  }

  let jobData;
  try {
    jobData = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error parsing JSON-LD data:', error);
    return null;
  }

  const {
    title,
    hiringOrganization,
    jobLocation,
    baseSalary,
    employmentType,
    description,
    validThrough,
  } = jobData; // Destructure job data

  // Extract relevant job data
  const companyName = hiringOrganization?.name || 'N/A';
  const companyUrl = hiringOrganization?.url || 'N/A';
  const companyLogo = hiringOrganization?.logo?.url || 'N/A';
  const addressCountry = jobLocation?.address?.addressCountry || 'N/A';
  const addressRegion = jobLocation?.address?.addressRegion || 'N/A';
  const postalCode = jobLocation?.address?.postalCode || 'N/A';
  const minValue = baseSalary?.value?.minValue || 'N/A';
  const maxValue = baseSalary?.value?.maxValue || 'N/A';
  const salaryUnit = baseSalary?.value?.unitText || 'N/A';

  return [
    {
      title: title || 'N/A',
      companyName,
      jobLocation: addressCountry,
      companyUrl,
      companyLogo,
      addressCountry,
      addressRegion,
      postalCode,
      baseSalary: `${minValue}-${maxValue}`,
      salaryUnit,
      employmentType: employmentType || 'N/A',
      description: description || 'N/A',
      validThrough: validThrough || 'N/A',
    }
  ]; // Return an array of job data
};
