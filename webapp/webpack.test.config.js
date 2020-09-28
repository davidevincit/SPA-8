//module javascript di webpack per i test 

const path = require('path');

module.exports = {
	mode: 'none',
	
	//relative path
	entry: {
		test: ['./public/test/canary.test.js']			
	},
	output: {
	  //absolute path		
      filename: 'bundle.[name].js',
      path: path.resolve(__dirname, 'dist'),
	  publicPath:'/dist'	
    }

};