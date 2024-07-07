document.addEventListener('DOMContentLoaded', function(){
    //Работа модальных окон
	

	function showModal(modalId, modalTitle, modalText, managerMessage){ 
		let modal = document.querySelector('#'+modalId);
		let modalTitleBox = modal.querySelector('.modal__title');
		let modalTextBox = modal.querySelector('.modal__text');
		let managerMessageFeild = modal.querySelector('.modal__manager-message');
	;

		if(modalTitle){
			modalTitleBox.innerHTML = modalTitle;
		}else{
			modalTitleBox.innerHTML = 'Нужна консультация?';
		}
 
		if(modalText){
			modalTextBox.innerHTML = modalText;
		}else{ 
			modalTextBox.innerHTML = 'Специалисты нашей компании с радостью ответят на ваши вопросы, произведут расчет стоимости услуг и подготовят ндивидуальное коммерческое предложение';
		}
		if(managerMessage){ 
			managerMessageFeild.value = managerMessage;
		}else{
			managerMessageFeild.value = 'Заявка на консультацию'
		}

		let greatShadow = document.querySelector('.great-shadow');
		modal.setAttribute('aria-hidden', 'false');
		greatShadow.classList.add('show');
		setTimeout(function(){
            modal.classList.add('show');
        }, 200);
	}
 
    function toggleModal(modalId){ 
        let modal = document.querySelector('#'+modalId); 
        let allModal = document.querySelectorAll('.modal');
        allModal.forEach(item=>{
			item.classList.remove('show');
			item.setAttribute('aria-hidden', 'true');
		});

        setTimeout(function(){
            modal.setAttribute('aria-hidden', 'false');
		    modal.classList.add('show');
        }, 200);
         

    }
	
	function hideModal(){ 
		let greatShadow = document.querySelector('.great-shadow');
		let nlModals = document.querySelectorAll('.modal'); 
		let nlModalMessage = document.querySelectorAll('.modal__message');

		nlModals.forEach(item=>{ 
			item.classList.remove('show'); 
			item.setAttribute('aria-hidden', 'true');
			; 
		}); 
		nlModalMessage.forEach(item=>{
			item.classList.remove('show');
		});
        setTimeout(function(){
            greatShadow.classList.remove('show');
        }, 100);
		
	}
	
	
	let nlShowModalBtn = document.querySelectorAll('.show-modal-btn'); 
	if(nlShowModalBtn.length > 0){
		nlShowModalBtn.forEach(item=>{ 
			item.addEventListener('click', function(){   
				showModal(this.getAttribute('data-modal-id'), this.getAttribute('data-modal-title'), this.getAttribute('data-modal-text'), this.getAttribute('data-manager-message'))
			});
		});
	}

	let greatShadow = document.querySelector('.great-shadow'); 
	if(greatShadow){
		greatShadow.addEventListener('click', function(e){
            if(e.target.className == 'great-shadow show'){
                hideModal();
            } 
        });
	}
 

	let applicationForm = document.querySelector('.application-form'); 
	if(applicationForm){
		applicationForm.addEventListener('submit', function(e){
			e.preventDefault(); 
			let tk  = '';
			grecaptcha.ready(function() {
			  grecaptcha.execute('6LcwCG0oAAAAAFhSvxfWdAXTPHkOGcIu5ruPPm5f', {action: 'homepage'}).then(function(token) {
				tk = token;
			    applicationForm.querySelector('.modal__token').value = token;
				
				let fd = new FormData(applicationForm);
				fd.append('url', window.location.href); 
				let formObject = {};
				fd.forEach((item, index )=>{
					formObject[index] = item;
				});   
				// console.log(formObject);
				
				fetch('/_api/application.php', {
					method: 'POST',
					headers: {
						"Content-type": "multipart/form-data"
					},
					body: JSON.stringify(formObject) 
				})
				.then(response=> response.json())
				.then(result => {
					if(result){ 
						if(result.status){  
							let currentModal = applicationForm.closest('.modal'); 
							let successMessage = currentModal.querySelector('.modal__message--success'); 
							successMessage.classList.add('show'); 
							setTimeout(function(){
								hideModal();
							}, 5000)
						}else{
							let currentModal = applicationForm.closest('.modal'); 
							let errorMessage = currentModal.querySelector('.modal__message--error'); 
							errorMessage.classList.add('show'); 
							setTimeout(function(){
								hideModal();
							}, 5000)
						} 
			
					};
				})
				.catch(error => console.log(error));
			
			  });
			});  
		});
	}
})