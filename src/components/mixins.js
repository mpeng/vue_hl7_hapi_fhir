export default {
  methods: {
    myMethod () {
      console.log( "Mixins.myMethod" );
    },

    capitalizeFirstLetter(string) {
      if ( string && string.length > 1 )
        return string.charAt(0).toUpperCase() + string.slice(1);
      else
        return "";
    },

    isNumber(string){
      if(typeof string === "string"){
        return(!isNaN(string));
      }
      return false;
    }
  }
}
