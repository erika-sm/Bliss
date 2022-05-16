const users = [
  {
    displayName: "Des",
    profilePicture:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { track: "3uXh4oG39pXsqEXoHuxgZU" },
      { track: "5FkoSXiJPKTNyYgALRJFhD" },

      { artist: "0fA0VVWsXO9YnASrzqfmYu" },
    ],
    username: "Des",
  },
  {
    displayName: "Allie",
    profilePicture:
      "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "5gspAQIAH8nJUrMYgXjCJ2" },
      { artist: "4SQdUpG4f7UbkJG3cJ2Iyj" },

      { track: "0OijABrqIE3h6iDcDjLagm" },
    ],
    username: "Allie",
  },
  {
    displayName: "Missy",
    profilePicture:
      "https://images.unsplash.com/photo-1522307837370-cc113a36b784?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI1fHxwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "6LEeAFiJF8OuPx747e1wxR" },
      { artist: "3jk39CGeaaSO3FPKNx1RUx" },

      { artist: "0cGUm45nv7Z6M6qdXYQGTX" },
    ],
    username: "Missy",
  },
  {
    displayName: "Josh",
    profilePicture:
      "https://images.unsplash.com/photo-1463430144406-394c977562d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTY4fHxwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "3HJIB8sYPyxrFGuwvKXSLR" },
      { artist: "5PbpKlxQE0Ktl5lcNABoFf" },

      { track: "6qQGxKyy6LcyZVsWn93lyS" },
    ],
    username: "Josh",
  },
  {
    displayName: "Lauren",
    profilePicture:
      "https://images.unsplash.com/photo-1581181939846-534d2ea4ec3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHNtb2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "5QdyldG4Fl4TPiOIeMNpBZ" },
      { artist: "3kjuyTCjPG1WMFCiyc5IuB" },

      { track: "4xaVx8jb12zUS6l2Ckx6nW" },
    ],
    username: "Lauren",
  },
  {
    displayName: "Shadow",
    profilePicture:
      "https://images.unsplash.com/photo-1613371005024-bb67527dc4b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjc0fHxuaWdodCUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "2uYWxilOVlUdk4oV9DvwqK" },
      { artist: "7ltDVBr6mKbRvohxheJ9h1" },

      { artist: "4SQdUpG4f7UbkJG3cJ2Iyj" },
    ],
    username: "Shadow",
  },
  {
    displayName: "Carter",
    profilePicture:
      "https://images.unsplash.com/photo-1647793139802-8ff0b44dec6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODk5fHxuaWdodCUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "50co4Is1HCEo8bhOyUWKpn" },
      { artist: "67lytN32YpUxiSeWlKfHJ3" },

      { artist: "2DGBzoOLcKLK3eWxFyugdB" },
    ],
    username: "Carter",
  },
  {
    displayName: "Quinn",
    profilePicture:
      "https://images.unsplash.com/photo-1495305379050-64540d6ee95d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "6nxWCVXbOlEVRexSbLsTer" },
      { track: "44dFOGFKVgNrx6UilTRVfZ" },

      { artist: "6Tyzp9KzpiZ04DABQoedps" },
    ],
    username: "Quinn",
  },
  {
    displayName: "Caelid",
    profilePicture:
      "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEyfHxtdXNpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
    itemsToDisplay: [
      { artist: "0GDGKpJFhVpcjIGF8N6Ewt" },
      { artist: "3KdXhEwbqFHfNfSk7L9E87" },

      { track: "4pD0LecI6QdNRtpBy6nZuy" },
    ],
    username: "Caelid",
  },
];

module.exports = { users };
