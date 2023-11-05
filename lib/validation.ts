export const validateResponse = (completion: string): string => {
  return (
    checkForFunctionDefinition(completion) ||
    isLikelyPython(completion) ||
    checkForJavascriptTags(completion) ||
    ''
  )
}

const checkForFunctionDefinition = (str: string) => {
  // Matches various function definitions including function declarations, function expressions, arrow functions, and shorthand method definitions
  const functionPattern =
    /\bfunction\s+\w+\s*\(.*\)\s*{|(?:\bconst|\blet|\bvar)\s+\w+\s*=\s*function\s*\(.*\)\s*{|(?:\bconst|\blet|\bvar)\s+\w+\s*=\s*\(.*\)\s*=>\s*{|(?:\bconst|\blet|\bvar)\s+\w+\s*=\s*\(.*\)\s*=>|class\s+\w+\s*{.*\bconstructor\s*\(.*\)\s*{|}\s*\w+\s*\(.*\)\s*{/
  if (functionPattern.test(str)) {
    // Show hint to the user
    return 'Just the body of the function is needed, not the whole definition.'
  }
  return ''
}

const checkForJavascriptTags = (str: string) => {
  // Matches if the string starts with <javascript> and ends with </javascript>
  const javascriptTagPattern = /^\s*<javascript>\s*[\s\S]*<\/javascript>\s*$/i
  if (!javascriptTagPattern.test(str)) {
    return 'The code should be enclosed within <javascript> tags.'
  }
  // Extract the code inside the <javascript> tags to pass it to other validation functions
  const codeInsideTags = str.replace(
    /^\s*<javascript>\s*|\s*<\/javascript>\s*$/gi,
    ''
  )
  // Perform other validations on the extracted code
  return (
    checkForFunctionDefinition(codeInsideTags) ||
    isLikelyPython(codeInsideTags) ||
    ''
  )
}

const isLikelyPython = (str: string) => {
  // Patterns that are more specific to Python
  const patterns = [
    /\bdef\s+\w+\s*\(.*\)\s*:/, // Function definition
    /\bclass\s+\w+\s*:/, // Class definition
    /\bimport\s+\w+/, // Import statement
    /\bfrom\s+\w+\s+import\b/, // From...import statement
    /\bprint\s*\(.*\)/, // Print function
    /^[\s]*\w+\s*=\s*[\w\'\"]+$/, // Variable assignment with indentation
    /__name__\s*==\s*__main__/, // Main method check
    /\bNone\b/, // None keyword
    /\bTrue\b|\bFalse\b/, // Boolean literals
    /\bexcept\s+\w+\s*:/, // Exception handling
    /->\s*\w+:/ // Function annotation
  ]

  if (patterns.some(pattern => pattern.test(str)))
    return 'Your code must be in JavaScript, not Python'
  return ''
}
