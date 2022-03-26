"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <button class="favButton">♥</button>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


$submitStory.on('submit', async function(e){
  e.preventDefault();
  const title = $('#createTitle').val();
  const subUrl = $('#createUrl').val();
  const author = $('#createAuthor').val();
  // console.log(currentUser);
  const user = currentUser.username;
  console.log(user)
  const fullStory = {title, subUrl, author, user}
  console.log(fullStory);
  const addedStory = await storyList.addStory(currentUser, fullStory)
  console.log(addedStory)
  const genStory = generateStoryMarkup(addedStory);

  $allStoriesList.prepend(genStory);

  $submitStory.hide();
  $allStoriesList.show();
})


$allStoriesList.on('click', '.favButton', async function (e) {
  console.debug("toggle Favorite");
  const $target = $(e.target)
  const $targetParent = $(e.target);
  const $stId = $targetParent.attr("id");
  const thingId = storyList.stories.find(s => s.$stId === $stId);
  
  if ($target.hasClass("isFav")) {
    $target.removeClass('isFav')
    await currentUser.removeFavorite(thingId);
  } else {
    $target.addClass('isFav')
    await currentUser.addFavorite(thingId);
  }
})