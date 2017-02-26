# CityFix

[https://cityfix.herokuapp.com/](https://cityfix.herokuapp.com/)

![](http://i.imgur.com/OqQ52hYh.png?1)

## Background

CityFix is a solution to help city residents **improve their neighbourhood**. If residents witness something that needs fixing, such as a cracked pavement or a stained wall, they can post an issue request on CityFix. Public Works Officers will then receive the requests and get to work. Residents can view the completion status of their requests.

**For public works officers:** CityFix helps public works administrators focus on actually doing their work, rather than merely managing their work. Administrators will receive an overview of the public works requests from all resident users on a map.

But really - this is just an experiment. This is my first time building a full-stack web app, using Node.js and Express, with the following features:
* Two Models: Issue requests, and Users
* RESTful Routes for both Issues and Users
* Partitioned Views and Access levels for Admins vs. Users
* Login and Authentication using [Passport](http://passportjs.org/)
* Use of Google Maps API

## Process

The idea was to build a sandbox incident management web app that could be used for a range of purposes involving customers and admins. The context used here was for public works requests, inspired by the Boston Government's [BOS:311](https://311.boston.gov/) app and the Singapore Government's [OneService](http://www.mnd.gov.sg/mso/) app.

Wireframes and Page Flow are as follows. Each submitted issue request would assume the form of a card that would appear on a city admin's 'drawing board':

![Wireframes 1](http://i.imgur.com/4NjtrzCl.jpg)  |  ![Wireframes 2](http://i.imgur.com/Q7Lfj8ul.jpg)
:------------------------------------------------:|:-------------------------------------------------:
![Wireframes 3](http://i.imgur.com/Rw2TUu4l.jpg)  |  ![Workflow 1](http://i.imgur.com/pXr2SGGl.jpg)

Eventually the website looks like this:

![Screenshot 1](http://i.imgur.com/eYTJJcZl.png)  |  ![Screenshot 2](http://i.imgur.com/O1hcoChl.png)
:------------------------------------------------:|:-------------------------------------------------:
![Screenshot 3](http://i.imgur.com/ViYovgkm.png)  |  ![Screenshot 1](http://i.imgur.com/IOLFU7ql.png)

## Development

* [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/)
* [mLab (mongoDB Hosting)](https://mlab.com)
* [Heroku Cloud Server](https://www.heroku.com)
* ORM: [Mongoose](http://mongoosejs.com/)
* Views: [Embedded JavaScript (eJS)](http://www.embeddedjs.com/)
* [Bootstrap CSS Framework](http://getbootstrap.com/), with a Bootstrap Template
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)
* HTML5, JavaScript, jQuery
* [View Code Workflow here](https://docs.google.com/presentation/d/1ITwuTbmCb5NxDnSrQR9oVQErXeRScOzGDQ_VX3Mq5Og/sharing)

## References, Tools, and Inspiration

* [BOS: 311 App](https://311.boston.gov/)
* [OneService App](http://www.mnd.gov.sg/mso/)
* [Bootstrap Components](http://getbootstrap.com/components/)
* [Bootstrapmade Theme Library](https://bootstrapmade.com/)
* [Design Ideas for Bootstrap Panels](https://www.google.com.sg/search?q=bootstrap+panel+designs&biw=960&bih=960&source=lnms&tbm=isch&sa=X&sqi=2&ved=0ahUKEwimiZOMya3SAhUSPrwKHYDoBOoQ_AUIBigB)
* [Font-Awesome Icon Library](http://fontawesome.io/)
* Instructors and Classmates at GA Singapore
