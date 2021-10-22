import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Formik, Form, FormikValues } from 'formik'
import { StepStoryUploadContext } from './Context'
import { useContext } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import schema from './schema'

const StepStoryUpload = () => {
  const { store, actions } = useContext(StepStoryUploadContext)
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = ['Story title', 'Description', 'Upload']

  const handleSubmit = (values: FormikValues) => {
    console.log(values)
  }

  const initialValues = { title: '', description: '' }

  return (
    <Formik initialValues={initialValues} validationSchema={schema} enableReinitialize onSubmit={handleSubmit}>
      {({ isSubmitting, isValid, values, handleBlur, handleChange, touched, errors, handleSubmit }) => (
        <Form>
          <Dialog
            fullWidth
            onClose={(event, reason) => {
              if (reason !== 'backdropClick') {
                actions.close()
              }
            }}
            open={store.isOpen}
          >
            <DialogTitle>New story</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ width: '100%', marginBottom: 2 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {activeStep === 0 && (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 400, marginBottom: 3 }} gutterBottom>
                    Rakonto makes it easy to record and share your stories. And if you have more questions and need
                    help, we’re here for you!
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    What is your story called?
                  </Typography>
                  <TextField
                    key={'title'}
                    name={'title'}
                    fullWidth
                    margin="dense"
                    placeholder={'Click to select a Title or type your own Story title'}
                    onBlur={handleBlur}
                    value={values['title']}
                    onChange={handleChange}
                    error={touched['title'] && Boolean(errors['title'])}
                    helperText={touched['title'] && errors['title']}
                  />
                </Box>
              )}
              {activeStep === 1 && (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 400, marginBottom: 3 }} gutterBottom>
                    Okay, just one more question before you start recording. You will can enter or edit this information
                    after recording.
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                    What is this story about (in just one or a few sentences)?
                  </Typography>
                  <TextField
                    key={'description'}
                    name={'description'}
                    fullWidth
                    multiline
                    rows={4}
                    margin="dense"
                    value={values['description']}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched['description'] && Boolean(errors['description'])}
                    helperText={touched['description'] && errors['description']}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {activeStep > 0 && (
                <Button variant="contained" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  {'Back'}
                </Button>
              )}
              {activeStep === 2 ? (
                <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                  Finish
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={(activeStep === 0 && !!errors.title) || (activeStep === 1 && !!errors.description)}
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default StepStoryUpload
