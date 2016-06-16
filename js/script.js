// 0. PREWORK

// Function to concatenate strings
var genParamString = function(paramObject) {
    var outputString = '?'
    if(token !== ''){
    	for (var key in paramObject) {
     	outputString += key + '=' + paramObject[key] + '&'
     	return outputString.substr(0,outputString.length - 1)

    	}
    } else {
    	return token
    }    
    
}

// Workaround solution for uploading to github without exposing the user API key
var name

try {
	var token = GLOBAL_TOKEN
}
catch (e) {
	var token = ''
}

// Function to concatenate user access token to API url & build full API Urls
var params = {
	access_token: token
}
var urlRepos = 'https://api.github.com/users/cukomadu/repos'
var urlProfile = 'https://api.github.com/users/cukomadu'
var fullReposUrl= urlRepos + genParamString(params)
var fullProfileUrl = urlProfile + genParamString(params)
console.log(fullReposUrl)
console.log(fullProfileUrl)



// 1. NORMAL MODE - DEFAULT GIT PROFILE

// 1a. USER PROFILE SETUP

// Define Key Elemenst 
var mainContainer = document.querySelector('#container')
var profileContainer = document.querySelector('#userProfile')
var reposContainer = document.querySelector('#repoData')


// Define Promise and Initialize 2 API Requests to Github Repo and User Profile APIs
var promiseRepos = $.getJSON(fullReposUrl)
var promiseProfile = $.getJSON(fullProfileUrl)


// Define Functions to handle the data received from User Profile API requests when it's ready
var profileDataHandler = function(profileResObject){
	console.log(profileResObject)

	// Declare Local Varaiables 
	var htmlString = ''
	var userName = profileResObject.name, 
		userLoginName = profileResObject.login,
		userBlog = profileResObject.blog,
		userLocation = profileResObject.location,
		userEmail = profileResObject.email,
		userImg = profileResObject.avatar_url,
		userUrl = profileResObject.html_url
		joinDate = profileResObject.created_at
		userBio = profileResObject.bio
		userFollowers = profileResObject.followers
		userFollowing = profileResObject.following
		userStarred = profileResObject.userStarred
		userCollaborators = profileResObject.collaborators

	// Check for Null Values
	if (userEmail === null) {
			userEmail = "Information not provided"

	} 
	if(userBio === null){
			userBio = "Information not provided"

	} 
	if(userBlog === null){
			userBlog = "Information not provided"
	} 
	if(userCollaborators === undefined){
			userCollaborators = "0"
	}

	//Convert Join Date to String
	var d = new Date(joinDate),
		dstring = d.toDateString(),
		newdString = dstring.substring(3),
		//console.log(newdString)
		dateArray = newdString.split(' ')
		//console.log(dateArray)
		var newArray = []
		var addComma = dateArray[2] + ','
		nJoinDate = dateArray[1] + ' ' +  addComma + ' ' + dateArray[3] 
		//nJoinDate = newArray.join(' ')
		console.log(nJoinDate)

	// Build an HTML String
		// User Profile Column 
			// Profile Image
	htmlString += '<div class="upchilddiv" id="imgdiv">'
	htmlString += 	'<img id="profileImg" src="' + userImg + '">'
	htmlString += '</div>'
			
			// Main Bio
	htmlString += '<div class="upchilddiv" id="mainbio">'
	htmlString += 	'<h1 id="name">' + userName + '</h1>'
	htmlString += 	'<p id="login">' + userLoginName + '</p>'
	htmlString += 	'<p id="userbio">' + userBio + '</p>'
	htmlString += '</div>'
			
			// Contact Info 
	htmlString += '<div class="upchilddiv" id="contactinfo">'
	htmlString += 	'<p id="location">' + userLocation + '</p>'
	htmlString += 	'<a id="email" href="' + userEmail + '">' + userEmail + '</a>'
	htmlString += 	'<br>'
	htmlString += 	'<a id="userblog" href="' + userBlog + '">' + userBlog + '</a>'
	htmlString += 	'<p id="date">' + 'Joined on' + ' ' + nJoinDate + '</p>'
	htmlString += '</div>'
			
			// Social Media Stats
	htmlString += '<div class="upchilddiv" id="socialmedia">'
	htmlString += 	'<div class="socialmediachild">'
	htmlString += 		'<div class="statlabel">'
	htmlString += 			'<span class="count">' + userFollowers + '</span>'
	htmlString += 		'</div>'
	htmlString += 		'<p class="text">' + 'Followers' + '</p>'
	htmlString += 	'</div>'
	htmlString += 	'<div class="socialmediachild">'
	htmlString += 		'<div class="statlabel">'
	htmlString += 			'<span class="count">' + userCollaborators + '</span>'
	htmlString += 		'</div>'
	htmlString += 		'<p class="text">' + 'Starred' + '</p>'
	htmlString += 	'</div>'
	htmlString += 	'<div class="socialmediachild">'
	htmlString += 		'<div class="statlabel">'
	htmlString += 			'<span class="count">' + userFollowing + '</span>'
	htmlString += 		'</div>'
	htmlString += 		'<p class="text">' + 'Following' + '</p>'
	htmlString += 	'</div>'
	htmlString += '</div>'

	// Write into the User Profile Container
	profileContainer.innerHTML = htmlString 
} 


// 1b. USER REPO SETUP

// Define Functions to handle the data received from Repo API request when it's ready
var reposDataHandler = function(repoResArray){
	//console.log(repoResArray)
	
	// Declare Local Variable
	var htmlRepoString = ''

	// Create Loop for Repo Response Array
	for (var i = 0; i < repoResArray.length; i++) {
			var repoObject = repoResArray[i],
				repoName = repoObject.name,
				repoDesc = repoObject.description,
				repoUpdatedAt = repoObject.updated_at

		// Check data and replace all undefined data with "not listed"
			if (repoDesc === null) {
				repoDesc = "Information not provided"
			}

		//Calculate Repo Update Elapsed Time
			var timeNow = new Date();
			console.log(timeNow)
			var timeNowMilsec = timeNow.getTime();
			console.log(timeNowMilsec)

			var repoUpdateTime = new Date (repoUpdatedAt)
			var repoUpdateTimeMilsec = repoUpdateTime.getTime();
			console.log(repoUpdateTimeMilsec)

			var repoElapsedTime = timeNowMilsec - repoUpdateTimeMilsec
			console.log(repoElapsedTime)

		// Convert Repo Elapsed Time from Milliseconds to [yrs, or mos, or day, or hr, or min, or sec]
			var elapsedTime = function (milSecs) {
    			var s = 1000,
    				m = s * 60,
        			h = m * 60,
        			d = h * 24,
        			m = d * 31,
        			y = m * 12

   				var secs = Math.floor(milSecs/s) + " sec",
   					mins = Math.floor(milSecs/(m)) + " min",
   					hrs = Math.floor(milSecs/(h)) + " hr",
   					days = Math.floor(milSecs/(d)) + " day",
  					mos = Math.floor(milSecs/(m)) + " mo",
   					yrs = Math.floor(milSecs/(y)) + " yr"

   				var timeArray = [yrs, mos, days, hrs, mins, secs]

   				for(var i = 0; i < timeArray.length; i++) {
       				if (parseInt(timeArray[i]) !== 0) {

           				if(parseInt(timeArray[i]) >= 2) {
               				return "Updated" + '  ' + timeArray[i] + "s ago"
           				}
           				else if (parseInt(timeArray[i]) < 2) {
               					return "Updated" + '  ' + timeArray[i] + " ago"
           				}
       				}

   				}

			}

			var newRepoUpdateTime = elapsedTime(repoElapsedTime)


		// Build an HTML String
			htmlRepoString += '<div class="repoContainer">'
			htmlRepoString += '<ul class="repo" id=loneranger">'
			htmlRepoString += 	'<h1 class="name">' + repoName + '</h1>'
			htmlRepoString += 	'<p class="desc">' + repoDesc + '</p>'
			htmlRepoString += 	'<p class="metadata">' + newRepoUpdateTime + '</p>'
			htmlRepoString += '</ul>'
			htmlRepoString += '</div>'
		
		
	}
	reposContainer.innerHTML += htmlRepoString 
}

// Invoke Promise (then) Function to excute handler functions
promiseRepos.then(reposDataHandler) 
promiseProfile.then(profileDataHandler)



// 2. ADVENTURE MODE - ANY GIT PROFILE

// Declare Key Element
var inputNode = document.querySelector("#inputBox")

var userSearch = function(eventObj) {
    console.log(eventObj)
    if (eventObj.keyCode === 13) {
         console.log(eventObj.target)
        
        //Extract User Input
        var inputElement = eventObj.target
        var inputValue = inputElement.value
    
        // Build Full API Urls
        var urlUserProfile ='https://api.github.com/users/'+ inputValue
        var urlUserRepos = 'https://api.github.com/users/'+ inputValue +'/repos'
        console.log(urlUserProfile)
        console.log(urlUserRepos)

        // Define Promise and Initialize 2 New API Requests to Github Repo and User Profile APIs
		var promiseUserProfile = $.getJSON(urlUserProfile)
		var promiseUserRepos = $.getJSON(urlUserRepos)

        promiseUserProfile.then(profileDataHandler)
		promiseUserRepos.then(reposDataHandler)

         //Clear the search box
        inputElement.value = ''
    }
}


inputNode.addEventListener("keydown", userSearch) 





