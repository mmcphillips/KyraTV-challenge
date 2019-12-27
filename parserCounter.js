//artifact of previous implementation
const getTotalVideos = (res) => {
  let result = [];
  result[0] = res.data.items[0].statistics.videoCount;
  result[1] = res.data.items[0].contentDetails.relatedPlaylists.uploads;
  return result[0]
}

module.exports = getTotalVideos;
