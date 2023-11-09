import React, { useEffect, useState } from 'react'
import { Grid } from "@material-ui/core";

import Widget from '../../../../components/widget'
import Attribute from "./attribute";
import PieChart from "../../../../components/pieChart";

const ImproveDetail = (props) => {
  const { template } = props
  const [attributes, setAttributes] = useState([])
  const [attentionToDetail, setAttentionToDetail] = useState({})
  const [customerOrientation, setCustomerOrientation] = useState({})
  const [creativeThinking, setCreativeThinking] = useState({})
  const [analyticalAbility, setAnalyticalAbility] = useState({})

  useEffect(() => {
    const _attributes = template?.attributes?.items || []
    let tmp = [..._attributes]
    _attributes.forEach((attribute, index) => {
      switch (attribute.key) {
        case "attentionToDetail":
          setAttentionToDetail(attribute);
          tmp.splice(index, 1);
          break;
        case "customerOrientation":
          setCustomerOrientation(attribute)
          tmp.splice(index, 1);
          break;
        case "creativeThinking":
          setCreativeThinking(attribute)
          tmp.splice(index, 1);
          break
        case "analyticalAbility":
          setAnalyticalAbility(attribute)
          tmp.splice(index, 1);
          break
      }
    })
    setAttributes(tmp);
  }, [template])
  return (
    <Widget
      title="Improve Detail"
      description={
        <span>
          Here are Attributes
        </span>
    }>
      <Grid className="pt-5" container spacing={2} alignItems="stretch">
        <Grid className="" item md={6} xs={12}>
          <div className="border-solid rounded border border-slate-600 my-1" style={{height: "calc(100% - 12px)"}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6} xs={12}>
                <PieChart data={[
                  { name: attentionToDetail.name, value: attentionToDetail.value, color: "#a04ced" },
                  { name: creativeThinking.name, value: creativeThinking.value, color: "#ffb100" },
                  { name: customerOrientation.name, value: customerOrientation.value, color: "#d92828" },
                  { name: analyticalAbility.name, value: analyticalAbility.value, color: "#5c3ae7" }
                ]} />
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#a04ced'}}></div>
                  <div>Attention to detail</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#ffb100'}}></div>
                  <div>Creative Thinking</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#d92828'}}></div>
                  <div>Customer Orientation</div>
                </div>
                <div className="flex items-center my-2 pl-4">
                  <div className="w-3 h-3 mr-3" style={{backgroundColor: '#5c3ae7'}}></div>
                  <div>Analytical Ability</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Attribute title="Attention to detail" isCheck={false} trackStyle={{backgroundColor: '#a04ced'}} initValue={attentionToDetail?.value} disabled={true} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Customer Orientation" isCheck={false} trackStyle={{backgroundColor: '#d92828'}} initValue={customerOrientation?.value} disabled={true} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Creative Thinking" isCheck={false} trackStyle={{backgroundColor: '#ffb100'}} initValue={creativeThinking?.value} disabled={true} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Attribute title="Analytical ability" isCheck={false} trackStyle={{backgroundColor: '#5c3ae7'}} initValue={analyticalAbility?.value} disabled={true} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="py-6" container spacing={2}>
        <Grid item xs={12}>
          <div className="font-bold pt-2">Final Attributes</div>
        </Grid>
        {attributes.map((attribute, index) => (
          <Grid item md={4} sm={6} xs={12} key={index}>
            <Attribute title={attribute?.name} isCheck={false} initValue={attribute?.value} disabled={true} />
          </Grid>
        ))}
      </Grid>
    </Widget>
  )
}
export default ImproveDetail;
