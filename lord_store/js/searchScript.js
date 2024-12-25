

document.addEventListener('DOMContentLoaded', function() {
  var searchWords = [ "SIO","SIO of that palform","lord store","how to sign up or login","login","sign up","usa", "morocco", "nono" ,"love", "javascript tutorial", "python basics", "best photo editing software", "android development", "website design","machine learning","data science","cybersecurity","cloud computing","blockchain technology","quantum computing","augmented reality","virtual reality","internet of things","smartphones","wearable technology","gaming consoles","computer programming","software development","web development","mobile apps","networking","digital marketing","e-commerce","latest movies", "trending music", "top TV shows", "funny videos", "video game reviews","movie reviews","music genres","celebrity gossip","TV show recommendations","streaming services","concert tickets","upcoming movie releases","film festivals","award shows","entertainment news",
                          "pop culture trends","celebrity interviews","behind-the-scenes","fan theories","world news headlines", "local news updates","stock market today", "weather forecast","online deals", "product reviews", "best tech gadgets", "fashion trends", "travel destinations","women's dresses", "men's jeans", "laptop deals", "smartphones", "wireless headphones", "coffee makers", "home decor", "bedding sets","nike", "adidas", "apple", "samsung", "sony","gifts under $50", "summer fashion trends", "back to school supplies", "black friday deals", "kitchen gadgets","healthy recipes","fitness workouts","yoga poses","meditation techniques","mental health tips","nutrition guides",
                          "weight loss strategies","home workouts","stress relief techniques","sleep hygiene","mindfulness practices","healthy eating","exercise routines","wellness retreats","medical conditions","alternative medicine","self-care practices","budget travel tips","solo travel advice","family vacation ideas","adventure travel","cultural experiences","backpacking tips","road trip essentials","luxury travel","travel hacks","travel insurance","flight deals","hotel accommodations","tourist attractions","local cuisine","travel blogs","personal finance","investment strategies","saving money tips","credit card rewards","retirement planning","financial independence","budgeting techniques","tax planning",
                          "side hustle ideas","passive income streams","wealth management","financial literacy","debt management","mortgage options","stock market","study tips","test preparation","language learning","coding tutorials","academic resources","career development","college admissions","student loans","scholarship opportunities","educational technology","learning platforms","distance learning","tutoring services","academic programs","home organization","DIY projects","interior design","gardening tips","cooking techniques","parenting advice","pet care tips","relationship advice","self-improvement","productivity hacks","time management","stress management","hobby ideas","travel photography","fashion trends","beauty tips","wellness routines",
                          "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies",
                          "Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
                          "Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City",
                          "Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe" , "programming languages","web development frameworks","data analysis tools","graphic design software","mobile app development","cloud storage services","video editing software","cybersecurity measures","virtual private networks","digital marketing strategies","e-commerce platforms","celebrity news","music festivals","stand-up comedy specials","documentary recommendations","TV series binge-watching","movie streaming platforms","album reviews","gaming communities","comic book adaptations","award-winning films","political news","global economy updates","business trends","social media controversies","environmental issues","scientific discoveries","space exploration news","sports highlights","healthcare reforms","education policies","online shopping tips",
                          "discount codes","fashion accessories","home improvement tools","kitchen appliances","travel essentials","outdoor gear","pet supplies","tech accessories","book recommendations","healthy meal plans","fitness challenges","mind-body exercises","stress management techniques","natural remedies","mental health resources","sleep improvement methods","wellness retreat locations","mindfulness apps","alternative therapies","sustainable travel practices","off-the-beaten-path destinations","cultural immersion experiences","adventure sports","road trip itineraries","luxury accommodations","budget-friendly travel hacks","travel photography tips","backpacking gear recommendations","travel safety advice","investment opportunities","savings accounts","credit score improvement","retirement savings plans","tax-saving strategies","budgeting apps",
                          "passive income ideas","real estate investment tips","stock market analysis","cryptocurrency trends","online learning platforms","study abroad programs","test-taking strategies","language exchange communities","coding bootcamps","scholarship search engines","career exploration resources","professional development courses","educational podcasts","academic research databases","self-care routines","home workout plans","creative hobbies","mindfulness practices","family bonding activities","sustainable living tips","relationship-building exercises","time management techniques","personal development books","organization hacks","free Palestine",
                          "i love you nono idi sama ya nono dyalii hmmmm hhhhhhhh"];

  var searchInput = document.getElementById('searchInput');
  var autocompleteContainer = document.createElement('div');
  autocompleteContainer.className = 'autocomplete-items';
  searchInput.parentNode.appendChild(autocompleteContainer);

  // Function to prioritize relevance and support user input variations
  function prioritizeRelevance(words, input) {
    return words.filter(word => word.toLowerCase().includes(input.toLowerCase()))
                .sort((a, b) => a.toLowerCase().indexOf(input.toLowerCase()) - b.toLowerCase().indexOf(input.toLowerCase()));
  }

  // Throttle function to limit how often a function can run
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  searchInput.addEventListener('input', throttle(function() {
    var value = this.value.toLowerCase();
    autocompleteContainer.innerHTML = ''; // Clear previous results

    if (value) {
      var hasMatches = false;
      var matchesCount = 0; // Counter for limiting the number of displayed options
      var maxSuggestions = 8; // Maximum number of suggestions to display

      // Prioritize relevance and support user input variations
      var relevantWords = prioritizeRelevance(searchWords, value);

      relevantWords.forEach(function(word) {
        if (matchesCount < maxSuggestions) {
          var matchStart = word.toLowerCase().indexOf(value);
          var matchEnd = matchStart + value.length;
          var beforeMatch = word.slice(0, matchStart);
          var matchText = word.slice(matchStart, matchEnd);
          var afterMatch = word.slice(matchEnd);
          var resultItem = document.createElement('div');
          resultItem.innerHTML = `${beforeMatch}<strong style="color: #007bff;">${matchText}</strong>${afterMatch}`;
          autocompleteContainer.appendChild(resultItem);
          hasMatches = true;
          matchesCount++; // Increment the counter for each match

          resultItem.addEventListener('click', function() {
            searchInput.value = this.textContent;
            autocompleteContainer.innerHTML = ''; // Clear results after selection
          });
        }
      });

      if (!hasMatches) {
        autocompleteContainer.innerHTML = '<div class="no-results">No matches found, but we like that</div>';
      }
    }
  }, 200)); // Throttle input event

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      autocompleteContainer.innerHTML = ''; // Clear results when clicking outside
    }
  });
});