function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUserData() {
  return {
    completedMeetings: getRandomInt(0, 200),
    rate: getRandomInt(1, 5),
    image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${(
      Math.random() + 1
    )
      .toString(36)
      .substring(7)}`
  }
}

module.exports = {
  generateUserData
}
