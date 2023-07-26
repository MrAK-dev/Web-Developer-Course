const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive;
  let ratingValue;
  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating_set')) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');
    for (let i = 0; i < ratingItems.length; i++) {
      const ratingItem = ratingItems[i];
      ratingItem.addEventListener('mouseenter', () => {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener('mouseleave', () => {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener('click', () => {
        initRatingVars(rating);
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = i + 1;
          setRatingActiveWidth();
        }
      });
    }
  }

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains('rating_sending')) {
      rating.classList.add('rating_sending');

      const response = await fetch('', {
        method: 'GET',
        // body: JSON.stringify({
        //   userRating: value
        // }),
        // headers: {
        //   'content-type': 'application/json'
        // }
      });

      if (response.ok) {
        const result = await response.json();

        const newRating = result.newRating;

        ratingValue.innerHTML = newRating;

        setRatingActiveWidth();

        rating.classList.remove('rating_sending');
      }
    } else {
      alert('Error!');

      rating.classList.remove('rating_sending');
    }
  }
}
