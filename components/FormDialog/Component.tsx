import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { FormDialogContext } from './Context'
import { useContext } from 'react'
import { Formik, Form, FormikValues } from 'formik'
import TextField from '@mui/material/TextField'

const FormDialog: React.FC = () => {
  const { store, actions } = useContext(FormDialogContext)
  const submit = (values: FormikValues) => {
    console.log('submited')
    store.submit(values)
    actions.close()
  }

  return (
    <Formik
      initialValues={store.initialValues}
      enableReinitialize
      validationSchema={store.validationSchema}
      onSubmit={submit}
    >
      {({ isSubmitting, values, handleChange, touched, errors, handleSubmit }) => (
        <Form>
          <Dialog open={store.isOpen as boolean}>
            <DialogTitle>{store.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{store.content}</DialogContentText>
              {store.fields?.map(field => (
                <TextField
                  key={field.name}
                  name={field.name}
                  fullWidth
                  margin="dense"
                  variant="standard"
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={handleChange}
                  error={touched[field.name] && Boolean(errors[field.name])}
                  helperText={touched[field.name] && errors[field.name]}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={actions.close}>{store.cancelText}</Button>
              <Button autoFocus onClick={() => handleSubmit()}>
                {store.okText}
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default FormDialog
