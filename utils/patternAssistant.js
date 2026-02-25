export const generatePatternAssistant = async (payload) => {
  return await $fetch("/api/pattern-assistant", {
    method: "POST",
    body: payload,
  });
};

export const buildPatternPrompt = ({
  productType,
  widthLabel,
  widthCount,
  lengthLabel,
  heightCount,
  inspirationText,
}) => {
  const lines = [
    `Product Type: ${productType || "N/A"}`,
    `Width (beads): ${widthLabel || widthCount || "unspecified"}`,
    `Length (beads): ${lengthLabel || heightCount || "unspecified"}`,
  ];

  if (widthCount) {
    lines.push(`Use widthCount: ${widthCount}`);
  }
  if (heightCount) {
    lines.push(`Use heightCount: ${heightCount}`);
  }

  if (inspirationText) {
    lines.push(`Inspiration text: ${inspirationText}`);
  }

  lines.push("Return JSON only.");
  return lines.join("\n");
};
