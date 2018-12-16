require('../Utilities/CustomLOcators.js');
let HomePage=require("../Pages/Home.page.js");
let Base=require('../Utilities/Base.js');
//DB Connection
var pgp            = require('pg-promise')(/*options*/);
var dbConnection   = require("../TestData/dbConnection.js");
var queries        = require("../TestData/dbQueries.js");


describe('BookIt Home Page test scripts',()=>{

    var db=pgp(dbConnection);
    var array=[]


    beforeEach(()=>{
        Base.navigateToHome();
    });

    it('should print out the  title',()=>{
        browser.getTitle().then(function(text){
            console.log(text)
        })
      
    })
    it('should check sign in text on the Home Page',()=>{
        expect(HomePage.homePageLogo.getText()).toEqual('sign in');

    })
    it('Should verify password field has "password" place holder',()=>{
        expect(HomePage.passwordPlaceHolder.getAttribute("placeholder")).toEqual("password");
           
       })
   
    it(' should be disabled "sign in" button when email & password fields empty',()=>{
           expect(HomePage.signButton.isDisplayed()).toBe(true);
                
            })

    fit('Should verify email field accepts only correct email format',()=>{
        db.any(queries.wrongEmail)
        .then(function(result){
            array=result
            console.log(array)
        }).catch(function(error){
            console.log(error)
        }).then(function(){
            // array.forEach(function(element){
            //     HomePage.email.sendKeys(element.firstname+"@gmail.co");
            //     browser.sleep(5000)
            //     HomePage.email.sendKeys(protractor.Key.ENTER)
            //     expect(element(by.css(".cdk-overlay-container")).toBe(true));
            //     browser.sleep(3000)
            //     HomePage.email.clear();
            //})
              for(var a=0;a<array.length-1;a++){
                HomePage.email.sendKeys(array[a].firstname+"@gmail.co");
                HomePage.email.sendKeys(protractor.Key.ENTER)
                browser.sleep(3000)
                HomePage.email.clear();
              }
                
            })
           

        })

    })

   
