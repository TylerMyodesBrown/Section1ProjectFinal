"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories");
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".nav-link").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


$navSubmit.on('click', async function (e){
  console.debug("Nav to Submission")
  hidePageComponents();
  $allStoriesList.hide();
  $submitStory.show();
})

$navMain.on('click', function(e){
  console.debug('nav to main page');
  hidePageComponents();
  $favList.hide();
  $submitStory.hide();
  $allStoriesList.show();
})


$navFavs.on('click', async function(e){
  console.debug('show favs')
  $allStoriesList.hide();
  $ownStoriesList.hide();
  $favList.empty();
  if(currentUser.favorites.length !== 0){
    for(let story of currentUser.favorites){
      let thing = generateStoryMarkup(story)
      console.log(thing);
      $favList.append(thing)
    }
  } else{
    $favList.append('<p>No favorites! Add some to get things going!</p>')
  }
  $favList.show();
})

$navOwnStories.on('click', async function(){
  console.log('show created stories')
  $allStoriesList.hide();
  $favList.hide();
  $ownStoriesList.empty();
  if(currentUser.ownStories.length !== 0){
    for(let story of currentUser.ownStories){
      console.log(story)
      let thing = generateStoryMarkup(story)
      thing.prepend('<button id="removeItem">Delete</button>')
      $ownStoriesList.append(thing)
    }
  } else{
    $ownStoriesList.append('<p>No Created Stories! Add some to get things going!</p>')
  }
  $ownStoriesList.show();
})