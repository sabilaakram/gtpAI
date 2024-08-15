import React from "react";

const StyleResponse = ({ result }: { result: string }) => {
  if (!result) return null;

  const parseResult = (text: string) => {
    // Convert newlines to <br /> tags
    let html = text.replace(/\n/g, "<br />");

    // Convert **bold** text to <strong>bold</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert ### heading to <h3> heading
    html = html.replace(/### (.*?)(?=<br \/>)?/g, "<h2>$1</h2>");

    return html;
  };

  return <pre dangerouslySetInnerHTML={{ __html: parseResult(result) }} />;
};

export default StyleResponse;
