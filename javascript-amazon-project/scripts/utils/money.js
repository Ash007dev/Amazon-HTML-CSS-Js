export function formatCurrency(priceCents){
    return (priceCents/100).toFixed(2);
};


export default formatCurrency; // can be used, when exporting only one thing from a file, 
// and one file can have only one default export

