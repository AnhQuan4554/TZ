const labelMappings: Record<string, string> = {
  'hismelt-gas-emission-carbon': 'Carbon Emissions',
  'hismelt-input-biochar-carbon': 'Biochar Carbon Emissions',
  'hismelt-input-ironore-carbon': 'Iron Ore Carbon Emissions',
  'hismelt-srv-output-pig': 'SRV',
};
// TODO: rename this function or split the static mapping logic
export const capitalizeFirstLetter = (str: string, character?: string) => {
  if (labelMappings[str]) {
    return labelMappings[str];
  }

  const characterText = character || ' ';
  const arr = str.split(characterText);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const isValidUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
