const x = require('../../xlsx-populate-no-encryption');

export const aaaa = (bytes) =>
{
    x.fromDataAsync(bytes, {}).then(b => 
    {
        const table = b.sheets()[0].usedRange().cells();

        for (const row of table)
        {
            for (const cell of row)
            {
                console.log(cell.value(), cell.style("fill"));
            }
        }
    });
}
