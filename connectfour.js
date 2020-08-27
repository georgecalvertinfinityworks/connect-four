
let numberOfRows = 6
let numberOfColumns = 7
const grid = document.getElementById("grid")

for (let i=0; i<numberOfRows; i++){
    //create a new row element
    let row = document.createElement("div")
    row.className = "row"
    //place row in grid
    grid.appendChild(row)
    for (let j=0; j<numberOfColumns; j++){
        //create column element
        let column = document.createElement("div")
        column.className= "column"
        //create circle element
        const circle = document.createElement("div")
        circle.className = "circle"
        //place circle in column
        column.appendChild(circle)
        //change column id
        column.id = "row-"+(i)+"-column-"+(j);
        //place column in row
        row.appendChild(column);
    }
}

