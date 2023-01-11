class StringUtil {

    /**
     * Replace all non-alphanumeric characters from a string
     *  
     * @param str Input string
     * @param replacement Replacement string
     * @returns Replaced string
     */
    public replaceNonAlphaNumChars = (str: string, replacement: string = "") => {
        let regexPattern = /[^A-Za-z0-9]/g;
        return str.replace(regexPattern, replacement);
    }
}

export default StringUtil;
