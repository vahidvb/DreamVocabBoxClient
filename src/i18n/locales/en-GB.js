export default {
  app: {
    title: "Dream Vocab Box",
    language: "English"
  },

  pages: {
    app: {
      myAccount: "My Account",
      editProfile: "Edit Profile",

      boxScenarios: "Box Scenarios",
      scenario1Title: "Half-Day Box",
      scenario1Desc: "Review the box every half day (e.g., morning and evening).",

      scenario2Title: "Daily Box",
      scenario2Desc: "Review the box once per day.",

      scenario3Title: "Box Number Days",
      scenario3Desc: "Review the box based on its number (e.g., Box 3 every 3 days).",
      username: "UserName",
      usernameHint: "Your unique username for login",

      name: "Name",
      nameHint: "What should we call you?",

      email: "Email Address",
      emailHint: "Email for password recovery (optional)",

      changePassword: "Change Password",
      changePasswordHint: "If you do not want to change the password, leave this field blank (optional)",

      logout: "Logout",
      confirmLogout: "Confirm Logout",
      confirmLogoutText: "Are you sure you want to logout?",
      cancel: "Cancel",

      close: "Close",
      updateProfile: "Update Profile",

      myWords: "My Words",
      addNewWord: "Add New Word/Idiom",
      boxes: "Boxes",

      applicationSettings: "Application Settings",

      autoSpeechOnChecking: "Auto play the word when it begins to show",
      autoDetectClipboardChange: "Auto detect clipboard text",

      clipboardPermissionText: "The app needs permission to access the clipboard in browser settings. For more help, click here.",

      clipboardHelpTitle: "How to Enable Clipboard Access",

      chrome: "Chrome",
      firefox: "Firefox",
      safari: "Safari",

      chromeStep1: "Open the Chrome browser.",
      chromeStep2: "Go to the browser's settings.",
      chromeStep3: "Find the Site Settings or Settings section.",
      chromeStep4: "Navigate to Permissions and enable Clipboard.",

      firefoxStep1: "Open the Firefox browser.",
      firefoxStep2: "Go to the browser's Settings.",
      firefoxStep3: "Find the Permissions section and enable clipboard access.",

      safariStep1: "Open your phone's Settings app.",
      safariStep2: "Navigate to Safari.",
      safariStep3: "Look for clipboard-related settings and enable them.",

      otherBrowserTitle: "If using another browser",
      otherBrowserStep1: "Look for a similar Permissions or Site Settings option in the browser settings and enable clipboard access.",

      speechNotSupported: "Your browser does not support SpeechSynthesis",

      ttsSettings: "Text To Speech Settings",
      sampleText: "Text for test speech",

      rate: "Rate",
      rateHint: "Controls the speed of speech.",

      pitch: "Pitch",
      pitchHint: "Adjusts the pitch of the voice.",

      volume: "Volume",
      volumeHint: "Sets the volume of the speech.",

      friends: "Friends",
      messages: "Messages",

      addToMyWords: "Add {word} To My Words",
      viewInMyList: "View {word} In My List",

      wordSuggestion: "Word Suggestion",
      goToAddWord: "Go To Add New Word",

      updateCompleted: "Update completed successfully",
      latestChanges: "Latest changes in recent versions",
      version: "Version",
      gotIt: "Got it"
    },
    addVocabulary: {
      title: "Add New Word",
      add: "Add",
      word: "Word / Phrase",
      meaning: "Meaning",
      example: "Example",
      description: "Description"
    },
    vocabularies: {
      searchLabel: "Search text",
      listLength: "List Length",
      boxNumber: "Box Number",
      nothingFound: "Nothing found !!!",
      adjustFilters: "Please try adjusting your filters",
      tableWord: "Word",
      tableAction: "Action",
      showDetails: "Show Details",
      completeInfo: "Complete information",
      meaning: "Meaning",
      example: "Example",
      description: "Description",
      close: "Close",
      editTitle: "Edit",
      editBtn: "Edit",
      deleteTitle: "Remove {word}",
      deleteConfirmText: "Are you sure you want to delete this vocabulary? Please note that once deleted, it cannot be restored.",
      yes: "Yes!",
      no: "No"
    },
    messages: {
      wordSuggestions: "Word Suggestions"
    },
    login: {
      signInTitle: "Sign In",
      signInBtn: "Sign In",
      registerTitle: "Register",
      registerBtn: "Register",
      registerLink: "Register",
      username: "UserName",
      password: "Password",
      nickname: "Name",
      email: "Email Address",
      noAccount: "Haven't you registered yet?",
      haveAccount: "I have an account.",
      usernameHint: "Your unique username for login",
      nicknameHint: "What should we call you?",
      emailHint: "Email for password recovery (optional)",
      passwordHint: "Password without rules, enter anything you want",
      orContinueWith: "Or continue with...",
      guestRegister: "Quick Register As Guest 😒"
    },
    reviewVocabulary: {
      showMeaning: "Show Meaning",
      hideMeaning: "Hide Meaning",
      meaning: "Meaning",
      example: "Example",
      description: "Description",
      playPhrase: "PlayPhrase.me",
      prev: "Prev",
      next: "Next"
    },
    checkVocabulary: {
      showMeaning: "Show Meaning",
      hideMeaning: "Hide Meaning",
      wordsRemain: "Words Remain",
      lastOne: "Last One",
      meaning: "Meaning",
      example: "Example",
      description: "Description",
      playPhrase: "PlayPhrase.me",
      iRemember: "I Remember",
      iDontRemember: "I Don't Remember"
    },
    boxes: {
      all: "Show all boxes",
      box: "Box",
      empty: "Empty",
      needsChecking: "Needs Checking",
      checked: "Checked",

      total: "Total",
      waiting: "Waiting",
      waitingForCheck: "Waiting for check",

      closestReview: "Closest review",
      notScheduled: "Not scheduled yet",

      deeplyMemorized: "You have deeply memorized {count} words.",
      notReachedYet: "Oops! You haven't reached this box yet.",

      startChecking: "Start Checking",
      review: "Review",
      viewAllWords: "View All Words",
      addNew: "Add New",
      itsEmpty: "It's Empty",


    },
    friends: {
      searchInUsers: "Search in users",
      searchList: "Search List",
      noUsersYet: "There are no users yet.",
      searchUsersAndSendRequest: "You can search users and send a friend request",
      friendList: "Friend List",
      noFriendsYet: "There are no friends yet."
    }
  },

  plugins: {
    axios: {
      postRequestError: "Error occurred while sending request"
    }
  }
  ,
  components: {
    shareButton: {
      shareTitle: "Share {word}",
      messageOptional: "Message (Optional)"
    },
    userList: {
      cancelRequest: "Cancel Request",
      unfriend: "Unfriend",
      sendRequest: "Send Request",
      accept: "Accept",
      reject: "Reject",

      share: "Share",
      addedBefore: "Added this before",

      deeplyMemorized: "{name} has deeply memorized {count} words.",
      notReachedBox: "{name} hasn't reached this box yet.",

      totalVocabularies: "Total Vocabularies",
      registerAge: "Register Age",
      lastCheck: "Last Check",
      lastAddedVocabulary: "Last Added Vocabulary",
      totalChecks: "Total Checks",
      averageDailyCheck: "Average Daily Check",
      averageDailyLearnedCheck: "Average Daily Learned Check",
      averageDailyNotLearnedCheck: "Average Daily Not Learned Check",
      averageDailyAdd: "Average Daily Add"
    }

  }
  , public: {
    close: "Close",
  },
  "apiResultStatusCodes": {
    "0": "Operation failed",
    "1": "Operation successful",
    "2": "An error occurred",
    "3": "Invalid sent parameters",
    "4": "Not found",
    "5": "Authentication error",
    "6": "This item has already been registered",
    "7": "This user has already been registered",
    "8": "The specified user does not exist",
    "9": "Incorrect password",
    "10": "Sent parameters are invalid",
    "11": "Authentication failed",
    "12": "Access denied",
    "13": "Item not found",
    "14": "This username has already been chosen",
    "15": "This email has already been chosen",
    "16": "Username is required",
    "17": "Nickname is required",
    "18": "Password is required",
    "19": "Username cannot contain spaces",
    "20": "Registration completed successfully",
    "21": "Login completed successfully",
    "22": "Password cannot contain spaces",
    "23": "Vocabulary added successfully",
    "24": "Vocabulary updated successfully",
    "25": "Vocabulary removed successfully",
    "26": "You have already added this vocabulary",
    "27": "The word is required",
    "28": "Can't find any vocabulary",
    "29": "Congratulations! All the words in this box have been checked",
    "30": "You can't change the word field",
    "31": "Please fill required fields",
    "32": "No changes were found in your request",
    "33": "The specified user does not exist in repository",
    "34": "Friend request sent successfully",
    "35": "Friend request accepted successfully",
    "36": "Friend request cancelled successfully",
    "37": "You have unfriended successfully",
    "38": "You have rejected the request successfully",
    "39": "Message sent successfully"
  },
  "time": {
    "day": "day | days",
    "hour": "hour | hours",
    "minute": "minute | minutes"
  }

}
