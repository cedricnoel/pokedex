var interpolation_list = [];
var body;

class interpolation {
    constructor(expression, position, size, value){
        this.expression = expression;
        this.position = position;
        this.size = size;
        this.value = value;
    }

    /**
     * @description Function to detect any interpolation
     */
    static detect() {
        body = document.getElementsByTagName("body")[0];
        body = body.outerHTML;
        for(var i = 0; i < body.length; i++){
            if(body[i] == '{' && body[i+1] == '{'){
                //Add the expression and the position of the first interpolation
                interpolation.extractString(body, i + 2) ? interpolation_list.push(interpolation.extractString(body, i + 2)) : '';
            }
        }
        interpolation.interpolate();
    }

    /**
     * @description Replace the interpolation by the value
     */
    static interpolate(){
        for(let i = 0; i < interpolation_list.length; i++){

            if(this.checkInterpoliation(interpolation_list[i])){
                //Replace
                if(interpolation_list[i].value && !Array.isArray(interpolation_list[i].value)){
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
    static checkInterpoliation(interpolation) {
        let expression = interpolation.expression;
        let attribut = expression.split(".");

        //Convert first string to check if the object exist
        if(eval(attribut[0])){
            //Convert into object
            let obj = eval(attribut[0]);
            //Take the rest of the string as array attribut
            let args = attribut.slice(1)
            if(Array.isArray(args) && args[0].indexOf("[") > -1 && args[0].indexOf("]")){
                var index = args[0].substring(
                    args[0].lastIndexOf("[") + 1, 
                    args[0].lastIndexOf("]")
                );
                var temp_args = args[0].substring(
                   0, args[0].lastIndexOf("[")
                );
                obj = obj[temp_args][index];
                args.shift();
            }
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
    static extractString(body, index){
        let position = index;
        //Start size with 4 because of the double interpolation
        let size= 4;
        let param = [];
        try {
            //If regex is valid i.e it's an alphanumerical
            let regex = /[0-9a-z._[\]]/;
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
}
