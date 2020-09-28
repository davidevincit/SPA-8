//module javascript di webpack 

const path = require('path');
const webpack = require('webpack');


module.exports = {
	mode: 'development',
	
	//relative path
	entry: {
		spa: ['./public/js/spa.init.js']			
	},
	output: {
	  //absolute path		
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
	  publicPath:'/dist'	
    },

	module: {
	 	  	
     rules: [
	   {
       	test: /\.htm$/i,
        use: 'raw-loader',
       },
       {
		//verifica la presenza dei file specificate nel pattern match
         test: /\.css$/,
		//use is property for multiple loaders 
		//webpack use loader in resource order: Style before css
         use: [
           'style-loader',
           'css-loader',
         ],
       },
	   	
     ]
   },
   plugins:[
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
	})
   ],

  

	
   	
   
  /* 
  optimization: {
    minimize: true
  }*/

		
};