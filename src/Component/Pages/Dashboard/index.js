import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Col, Container, Card, Button } from 'react-bootstrap'
import './Dashboard.css'
import { addDataToAPI, deleteDataFromFirebase, getDataFromFirebase, updateDataFromFirebase } from '../../../Config/redux/action'
import { Fragment } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSave, faSignOutAlt, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class Dashboard extends Component {
  state = {
    judul: '',
    deskripsi: '',
    noteId: '',
    buttonText: 'Simpan',
    buttonColor: 'primary'
  }

  handleChangeInput = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData !== null) {
      this.props.getCatatan(userData.uid)
    }
  }

  handleCatatan = () => {
    const { judul, deskripsi, buttonText, noteId } = this.state
    const { saveCatatan, updateCatatan } = this.props
    const userData = JSON.parse(localStorage.getItem('userData'))
    const data = {
      judul: judul,
      deskripsi: deskripsi,
      tanggal: new Date().getTime(),
      userId: userData.uid
    }
    if (data.judul === '' && data.deskripsi === '') {
      alert('Isi Semua Form')
    } else {
      if (buttonText === 'Simpan') {
        saveCatatan(data)
        this.setState({
          judul: '',
          deskripsi: ''
        })
      } else {
        data.noteId = noteId
        updateCatatan(data)
        this.setState({
          buttonText: 'Simpan',
          buttonColor: 'primary',
          judul: '',
          deskripsi: ''
        })
      }
    }
  }

  handleLogOut = () => {
    localStorage.removeItem('userData')
    const { history } = this.props
    alert("Berhasil Logout :)")
    history.push('/login')
  }

  cardClick = (catatan) => {
    this.setState({
      judul: catatan.data.judul,
      deskripsi: catatan.data.deskripsi,
      noteId: catatan.id,
      buttonText: 'Update',
      buttonColor: 'success'
    })
  }

  handleBatal = () => {
    this.setState({
      judul: '',
      deskripsi: '',
      buttonText: 'Simpan',
      buttonColor: 'primary'
    })
  }

  handleDelete = (e, catatan) => {
    e.stopPropagation()
    if(catatan !== null){
      const { deleteCatatan } = this.props
      const userData = JSON.parse(localStorage.getItem('userData'))
      const data = {
        noteId: catatan.id,
        userId: userData.uid
      }
      deleteCatatan(data)
    }
  }

  render() {
    const { deskripsi, judul, buttonText, buttonColor } = this.state
    const { catatans } = this.props
    return (
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
        <h1 className="text-center" >Hello world<span onClick={this.handleLogOut}>!</span></h1>
        <br />
        <Form.Group className="from-dashboard">
          <Form.Row>
            <Form.Label column lg={2}>
              Judul
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Judul" value={judul} onChange={(e) => this.handleChangeInput(e, 'judul')} />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column lg={2}>
              Deskripsi
            </Form.Label>
            <Col>
              <Form.Control as="textarea" type="text" placeholder="Deskripsi" style={{ height: '150px', overflow: 'hiden', resize: 'none' }} value={deskripsi} onChange={(e) => this.handleChangeInput(e, 'deskripsi')} />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col className="text-left">
              <Button variant="outline-danger" onClick={this.handleLogOut}>LogOut <FontAwesomeIcon icon={faSignOutAlt} /></Button>
            </Col>
            <Col className="text-right">
              {
                buttonText === 'Update' ? (
                  <Button variant="warning" onClick={this.handleBatal} style={{ marginRight: '5px' }}>Batal <FontAwesomeIcon icon={faTimes} /></Button>
                ) : null
              }
              <Button variant={buttonColor} onClick={this.handleCatatan}>{buttonText} {buttonText === 'Simpan' ? (<FontAwesomeIcon icon={faSave} />) : (<FontAwesomeIcon icon={faArrowUp} />)} </Button>
            </Col>
          </Form.Row>
        </Form.Group>
        <br />
        <Container style={{ borderTop: '3px solid #7eca9c' }}>
          <hr />
          {
            catatans.length > 0 ? (
              <Fragment>
                {
                  catatans.map(catatan => {
                    return (
                      <Card className="bg-light text-dark kartu" onClick={() => this.cardClick(catatan)} key={catatan.id} style={{ marginBottom: '15px' }}>
                        <Card.Header className="text-uppercase row">
                          <Col>
                            {catatan.data.judul}
                          </Col>
                          <Col className="text-right text-danger">
                            <h3><FontAwesomeIcon icon={faTimesCircle} onClick={(e) => { if (window.confirm('Hapus Catatan?')) { this.handleDelete(e, catatan) }else{this.handleDelete(e,null)}}} /></h3>
                          </Col>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text className="text-justify">
                            {catatan.data.deskripsi}
                          </Card.Text>
                          <footer className="blockquote-footer text-dark">
                          <cite title="Source Title">{Date(catatan.data.tanggal)}</cite>
                          </footer>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
              </Fragment>
            ) : null
          }
        </Container>
      </div>
    )
  }
}

const reduxState = (state) => ({
  isLogin: state.isLogin,
  userData: state.user,
  catatans: state.catatan
})

const reduxDispatch = (dispatch) => ({
  saveCatatan: (data) => dispatch(addDataToAPI(data)),
  getCatatan: (data) => dispatch(getDataFromFirebase(data)),
  updateCatatan: (data) => dispatch(updateDataFromFirebase(data)),
  deleteCatatan: (data) => dispatch(deleteDataFromFirebase(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);