import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import {
  Grid,
  FormControl,
  Select,
  Checkbox,
  Slider,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {useStyles} from '../../style/common'

const useCustomStyles = makeStyles((theme) => ({
  check: {
    marginRight: 20,
  },
  form: {
    width: '80%'
  }
}))
const SearchForm = forwardRef((props, ref) => {
  const {complexityTypes, search, subTopicId} = props
  const customClasses = useCustomStyles()
  const classes = useStyles()
  const [isComplexity, setIsComplexity] = useState(false)
  const [complexity, setComplexity] = useState('')
  const [isMark, setIsMark] = useState(false)
  const [mark, setMark] = useState([0, 4])
  const [isTime, setIsTime] = useState(false)
  const [time, setTime] = useState([50, 200])
  const [isTag, setIsTag] = useState(false)
  const [tag, setTag] = useState('')
  const [isAttribute, setIsAttribute] = useState(false)
  const [attribute, setAttribute] = useState('')

  const handleSubmit = () => {
    let filter = {subTopicID: {eq: subTopicId}, paragraphID: {eq: ''}, isAdmin: {eq: true}}
    if (isComplexity)
      filter.complexity = {eq: complexity}
    if (isMark)
      filter.mark = {gt: mark[0], lt: mark[1]}
    if (isTime)
      filter.time = {gt: time[0], lt: time[1]}
    const tags = tag.split(',')
    const tagFilter = tags.map((item) => {
      return {tags: {eq: item}}
    })
    const attributes = attribute.split(',')
    const attributeFilter = attributes.map((item) => {
      return {attributes: {eq: item}}
    })
    if (isTag) {
      if (isAttribute) {
        filter.and = [
          {or: tagFilter},
          {or: attributeFilter},
        ]
      }
      else 
        filter.or = tagFilter
    }
    else if (isAttribute) {
      filter.or = attributeFilter
    }
    console.log('filter', filter)
    search(filter)
  }

  useImperativeHandle(ref, () => ({
    init() {
      setIsComplexity(false)
      setIsMark(false)
      setIsTime(false)
      setIsTag(false)
      setIsAttribute(false)
    }
  }))
  useEffect(() => {
    if (complexityTypes.length !== 0) {
      setComplexity(complexityTypes[0].name)
    }
  }, [complexityTypes])
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <div className={classes.label}>Complexity</div>
        <div className="d-flex">
          <Checkbox
            className={customClasses.check}
            checked={isComplexity}
            onChange={(e) => setIsComplexity(e.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <FormControl className={customClasses.form}>
            <Select
              native
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              inputProps={{
                name: 'complexity',
                id: 'complexity',
              }}
              disabled={!isComplexity}
            >
              {complexityTypes.map((item, index) => {
                return <option key={index} value={item.name}>{item.name}</option>
              })}
            </Select>
          </FormControl>
        </div>
        <div className={classes.label}>Mark</div>
        <div className="d-flex">
          <Checkbox
            className={customClasses.check}
            checked={isMark}
            onChange={(e) => setIsMark(e.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <FormControl className={customClasses.form}>
            <Slider
              value={mark}
              onChange={(e, newValue) => setMark(newValue)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10}
              disabled={!isMark}
            />
          </FormControl>
        </div>
        <div className={classes.label}>Time</div>
        <div className="d-flex">
          <Checkbox
            className={customClasses.check}
            checked={isTime}
            onChange={(e) => setIsTime(e.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <FormControl className={customClasses.form}>
            <Slider
              value={time}
              onChange={(e, newValue) => setTime(newValue)}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={300}
              disabled={!isTime}
            />
          </FormControl>
        </div>
        <div className={classes.label}>Tag</div>
        <div className="d-flex">
          <Checkbox
            className={customClasses.check}
            checked={isTag}
            onChange={(e) => setIsTag(e.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <FormControl className={customClasses.form}>
            <TextField id="tag" value={tag} onChange={(e) => setTag(e.target.value)} disabled={!isTag} />
          </FormControl>
        </div>
        <div className={classes.label}>Attribute</div>
        <div className="d-flex">
          <Checkbox
            className={customClasses.check}
            checked={isAttribute}
            onChange={(e) => setIsAttribute(e.target.checked)}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <FormControl className={customClasses.form}>
            <TextField id="attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)} disabled={!isAttribute} />
          </FormControl>
        </div>
        <button className={classes.button} variant="outlined" style={{float: 'right', margin: 20}} onClick={handleSubmit}>Search</button>
      </Grid>
    </Grid>
  )
})

export default SearchForm