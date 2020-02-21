import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import { 
  IconButton,
  Dialog, 
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Delete } from "@material-ui/icons"

import { remove } from "./api-user"
import auth from "../auth/auth-helper"

const useStyles = makeStyles( theme => ({
  card: {

  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  textField: {

  },
  error: {

  },
  submit: {

  }
}))

const DeleteUser = (props) => {

  const [redirect, setRedirect] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClick = () => setOpen(true)

  const handleRequestClose = () => setOpen(false)
   
  const deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: props.userId
    }, {t: jwt.token})
      .then( data => {

        if (data.error) {
          console.log(data.error)
        } else {
          auth.signout(() => console.log("deleted"))
          setRedirect(true)
        }
      }
    )
  }

  if (redirect) {
    return (<Redirect to="/"/>)
  }

  return (
    <span>
      <IconButton 
        aria-label="Delete" 
        onClick={handleClick}
        color="secondary"
      >
        <Delete/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>

          <Button 
            onClick={deleteAccount} 
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}
  
export default DeleteUser