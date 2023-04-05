const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');
const videoTitle = document.querySelector('.video h2');
const videoIframe = document.querySelector('.video iframe');
const videoViews = document.querySelector('.video p');
const relatedVideos = document.querySelectorAll('.videos li');
const channelName = document.querySelector('.channel-info h3');
const channelSubscribers = document.querySelector('.channel-info p');
const subscribeButton = document.querySelector('.channel-info button');

searchButton.addEventListener('click', () => {
  // Fetch data from YouTube API based on search input
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput.value}&type=video&key=YOUR_API_KEY_HERE`)
    .then(response => response.json())
    .then(data => {
      // Update main video section
      const videoId = data.items[0].id.videoId;
      const title = data.items[0].snippet.title;
      const viewsCount = data.items[0].statistics.viewCount;
      videoTitle.textContent = title;
      videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
      videoViews.textContent = `Views: ${viewsCount} | Likes: 0 | Dislikes: 0`;

      // Update related videos section
      for (let i = 0; i < relatedVideos.length; i++) {
        const thumbnail = data.items[i + 1].snippet.thumbnails.medium.url;
        const title = data.items[i + 1].snippet.title;
        const viewsCount = data.items[i + 1].statistics.viewCount;
        const likesCount = data.items[i + 1].statistics.likeCount;
        const dislikesCount = data.items[i + 1].statistics.dislikeCount;
        relatedVideos[i].querySelector('img').src = thumbnail;
        relatedVideos[i].querySelector('h3').textContent = title;
        relatedVideos[i].querySelector('p').textContent = `Views: ${viewsCount} | Likes: ${likesCount} | Dislikes: ${dislikesCount}`;
      }

      // Update channel info section
      const channel = data.items[0].snippet.channelTitle;
      const subscribers = data.items[0].statistics.subscriberCount;
      channelName.textContent = channel;
      channelSubscribers.textContent = `${subscribers} subscribers`;
    })
   
