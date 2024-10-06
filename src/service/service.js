
const Services = {

    instantResponse: async (query) => {
        const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extracting the most relevant text-based answer
            if (data.AbstractText) {
                return data.AbstractText;
            } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                // If no AbstractText is available, we try to get text from related topics
                return data.RelatedTopics[0].Text || "No direct answer found.";
            } else {
                return "No information found.";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return "An error occurred while fetching the data.";
        }
    }
}

export default Services;
