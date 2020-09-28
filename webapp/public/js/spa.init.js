import 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/spa.css'

import {spa} from './spa.js';

$(function () { spa.initModule( $('#spa') ); });