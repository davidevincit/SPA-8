Per distribuire l'applicativo su TomCat   
 1- creare un pacchetto in dist con webpack, con il comando npm run build  
 2- copiare i file in dist in webapps/nomeapp   

Per debug in node:  
 1- attivare il debug da CLI con in comando node inspect nome_file.js  
 2- attivare il browser con chrome://inspect  
 3- Click sull' host che viene riportato in chrome.
 
Per dev-mode:   
 1- lanciare il comando npm run build:server Si attiva il server webpack   

Per il test :   
 1- lanciare npm run test   
 2- per creare il bundle di test lanciare npm run build:test 
 
Remote github repository   https://github.com/davidevincit/SPA-8
 
 TOOL Utilizzati   
 nodejs, webpack, jest, jquery , bootstrap, mustache 