import firebase, {database} from '../../firebase'

export const actionUserName = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: 'CHANGE_USERNAME', value: 'asw' })
  }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true })
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // var user = userCredential.user;
        // console.log(user)
        dispatch({ type: 'CHANGE_ISLOADING', value: false })
        resolve(true)
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        dispatch({ type: 'CHANGE_ISLOADING', value: false })
        reject(false)
      })
  })
}

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'CHANGE_ISLOADING', value: true })
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        // console.log("sukses: ", res)
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        dispatch({ type: 'CHANGE_ISLOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: true })
        dispatch({ type: 'CHANGE_USERNAME', value: dataUser })
        resolve(dataUser)
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(errorCode, errorMessage)
        dispatch({ type: 'CHANGE_ISLOADING', value: false })
        dispatch({ type: 'CHANGE_ISLOGIN', value: false })
        reject(false)
      })
  })
}

export const addDataToAPI = (data) => (dispatch)=>{
  database.ref('catatan/' + data.userId).push({
    judul: data.judul,
    deskripsi: data.deskripsi,
    tanggal: data.tanggal
  })
}

export const getDataFromFirebase=(userId)=>(dispatch)=>{
  const urlCatatan = firebase.database().ref('catatan/' + userId)
  return new Promise((resolve,reject)=>{
    urlCatatan.on('value', function(snapshot) {
      // console.log('Get data : ', snapshot.val())
      const data = []
      if(snapshot.val() !== null){
        Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        })
      })
    }
      dispatch({type:'SET_CATATAN',value:data})
      resolve(snapshot.val())
    });
  })
}

export const updateDataFromFirebase=(data)=>(dispatch)=>{
  const urlCatatan = database.ref('catatan/'+ data.userId + '/' + data.noteId)
  return new Promise((resolve,reject)=>{
    urlCatatan.set({
      judul: data.judul,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal
    },(err) => {
      if(err){
        reject(false)
      }else{
        resolve(true)
      }
    })
  })
}

export const deleteDataFromFirebase=(data)=>(dispatch)=>{
  const urlCatatan = database.ref('catatan/'+ data.userId + '/' + data.noteId)
  return new Promise((resolve,reject)=>{
    urlCatatan.remove()
  })
}
