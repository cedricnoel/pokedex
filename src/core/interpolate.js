pokemon =     {
    name : "carapuce",
    type : "eau"
}

let interpolation_list = [];

class interpolation {
    constructor(expression, position, size){
        this.expression = expression;
        this.position = position;
        this.size = size;
    }
}

document.onreadystatechange = function () {
    if(document.readyState === "interactive"){
        detect();
    }
}

/**
 * @description Function to detect any interpolation
 */
function detect(){
    let body = document.getElementsByTagName("body")[0];
    body = body.outerHTML;
    for(var i = 0; i < body.length; i++){
        if(body[i] == '{' && body[i+1] == '{'){
            //Add the expression and the position of the first interpolation
            extractString(body, i + 2) ? interpolation_list.push(extractString(body, i + 2)) : '';
        }
    }
    interpolate();
}

function interpolate(){
    console.log(interpolation_list);
}


/**
 * @description Function to extract the interpolation expression
 * @returns A string that correspond to the expression between the interpolation
 */
function extractString(body, index){
    let position = index;
    //Start size with 4 because of the double interpolation
    let size= 4;
    let param = [];
    try {

        let regex = "[a-z.]";

        //Check the the end of interpolation
        while( (body.length - index > 0)){
            if(body[index] == "}" && body[index + 1] == "}"){
                return new interpolation( param.toString().replace(new RegExp(",", "g"),""), position, size);
            }else if(regex.exec()){
                
            }
            //Add each char as long as there is no end
            param.push(body[index]);
            index++;
            size++;
        }
    } catch (error) {
        throw error;
    }

}
