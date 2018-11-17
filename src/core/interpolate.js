var pokemon = {
    name : "carapuce",
    type : "eau",
    details : {
        "size" : "Big"
    }
}

var interpolation_list = [];
var body;

class interpolation {
    constructor(expression, position, size, value){
        this.expression = expression;
        this.position = position;
        this.size = size;
        this.value = value;
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
    body = document.getElementsByTagName("body")[0];
    body = body.outerHTML;
    for(var i = 0; i < body.length; i++){
        if(body[i] == '{' && body[i+1] == '{'){
            //Add the expression and the position of the first interpolation
            extractString(body, i + 2) ? interpolation_list.push(extractString(body, i + 2)) : '';
        }
    }
    interpolate();
}

/**
 * @description Replace the interpolation by the value
 */
function interpolate(){
    for(var i=0;i<interpolation_list.length;i++){
        if(checkInterpoliation(interpolation_list[i])){
            //Replace
            if(interpolation_list[i].value){
                document.body.innerHTML = document.body.innerHTML.replace("{{" + interpolation_list[i].expression + "}}", interpolation_list[i].value);
            }
        }else{
            console.log(interpolation_list[i].expression + " doesn't exist !");
        }
    }
    
}

/**
 * @param obj the object to compare
 * @param interpolation 
 * 
 * @description Check if the object and the attribut exist
 */
function checkInterpoliation(interpolation){
    var expression = interpolation.expression;
    var attribut = expression.split(".");

    //Convert first string to check if the object exist
    if(eval(attribut[0])){
        //Convert into object
        var obj = eval(attribut[0]);
        //Take the rest of the string as array attribut
        var args = attribut.slice(1)
        return hasProperty(obj, args);
    }else{
        return false;
    }

    //Check if the attribute exist
    function hasProperty(obj, args){
        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
            }
            obj = obj[args[i]];
        }
        //Add value of the interpolation
        interpolation.value = obj;
        return true;
    }
   
}


/**
 * @description Function to extract the interpolation expression
 * @returns A string that correspond to the expression between the interpolation
 */
function extractString(body, index){
    var position = index;
    //Start size with 4 because of the double interpolation
    var size= 4;
    var param = [];
    try {
         //If regex is valid i.e it's an alphanumerical 
        var regex = /[a-z.]/;
        //Check the the end of interpolation
        while( (body.length - index > 0)){
            if(body[index] == "}" && body[index + 1] == "}"){
                return new interpolation( param.toString().replace(new RegExp(",", "g"),""), position, size, "");
            }else if(regex.exec(body[index])){
                //Add each char as long as there is no end
                param.push(body[index]);
                index++;
                size++;
            }else{
                return false;
            }
        }
    } catch (error) {
        throw error;
    }

}
