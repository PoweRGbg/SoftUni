function sortAlpha(array) {
    let result = array.sort((a, b) => a.localeCompare(b));
    result.forEach((element, i) => {
        console.log(i + 1 + "." + element);
    });
}
sortAlpha(["John", "Bob", "Christina", "Ema"]);
    // sortAlpha();