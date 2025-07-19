    const models = [
      { id: "a1b2c3", title: "Modern Villa", style: "Modern", beds: "3" },
      { id: "d4e5f6", title: "Country Farmhouse", style: "Farmhouse", beds: "4+" },
      { id: "g7h8i9", title: "Traditional Two-Story", style: "Traditional", beds: "3" },
      { id: "j1k2l3", title: "Minimal Modern", style: "Modern", beds: "2" },
      { id: "m4n5o6", title: "Luxury Farm Retreat", style: "Farmhouse", beds: "4+" }
    ];

    let answers = {};

    function startWizard() {
      document.getElementById('modal').style.display = 'block';
    }

    function nextQuestion(qNum) {
      const spinner = document.getElementById('spinner');
      spinner.style.display = 'block';

      setTimeout(() => {
        spinner.style.display = 'none';
        document.getElementById(`question${qNum}`).classList.remove('active');
        document.getElementById(`question${qNum + 1}`).classList.add('active');

        if (qNum === 1) answers.style = document.getElementById('styleSelect').value;
        if (qNum === 2) answers.beds = document.getElementById('bedSelect').value;

        localStorage.setItem('houseAnswers', JSON.stringify(answers));
      }, 1000);
    }

    function finishWizard() {
      answers.address = document.getElementById('propertyAddress').value;
      const file = document.getElementById('surveyUpload').files[0];
      answers.surveyUploaded = !!file;
      localStorage.setItem('houseAnswers', JSON.stringify(answers));

      const matched = models.filter(model =>
        model.style === answers.style && (model.beds === answers.beds || answers.beds === "4+")
      );

      document.getElementById('modal').style.display = 'none';
      document.getElementById('resultGallery').style.display = 'block';
      const container = document.getElementById('galleryContent');
      container.innerHTML = '';

      matched.forEach(model => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h4>${model.title}</h4>
          <iframe src="https://my.matterport.com/show/?m=${model.id}" allowfullscreen></iframe>
        `;
        container.appendChild(div);
      });
    }
