import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer'

import {formatYmd} from '../../../../../functions/string'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  threeCol: {
    width: '30%',
  },
  twoCol: {
    width: '50%',
  },
  fiveCol: {
    width: '20%',
  },
  sixCol: {
    width: '16%',
  },
  speedmeter: {
    maringTop: 150,
  },
  analysis: {
    height: 200,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 3,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  textRight: {
    margin: 3,
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Times-Roman'
  },
  textRed: {
    color: 'red',
    margin: 3,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  textGreen: {
    color: 'green',
    margin: 3,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  textGray: {
    color: 'gray',
    margin: 3,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  logo: {
    height: 40,
    width: 40,
  },
  header: {
    fontSize: 12,
    color: 'grey',
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    paddingTop: 20,
  },
  thr: {
    flexDirection: 'row',
    backgroundColor: '#7c70e2',
    borderWidth: 1,
  },
  th: {
    width: '16%',
    textAlign: 'center',
    margin: 3,
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#7c70e2',
    color: 'white',
    padding: 5,
  },
  tho: {
    width: '16%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#f5a967',
    color: 'white',
    padding: 5,
    margin: 0,
  },
  th1: {
    width: '20%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#7c70e2',
    color: 'white',
    padding: 5,
    margin: 0,
  },
  tho1: {
    width: '20%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#f5a967',
    color: 'white',
    padding: 5,
    margin: 0,
  },
  tdr: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  td: {
    width: '16%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    borderRightWidth: 1,
    padding: 5,
    margin: 'auto',
  },
  tdo: {
    width: '16%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#f5a967',
    color: 'white',
    padding: 5,
    margin: 0,
  },
  td1: {
    width: '20%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    borderRightWidth: 1,
    padding: 5,
    margin: 0,
  },
  tdo1: {
    width: '20%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Times-Roman',
    backgroundColor: '#f5a967',
    color: 'white',
    padding: 5,
    margin: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 40,
    textAlign: 'right',
    color: 'grey',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const PDFDocument = (props) => {
  const {logo, overall, analysis, auth, student, average, rightSubtopics, leftSubtopics} = props
  
  return (
  <Document>
    <Page size="A4" style={styles.body}>
      <View style={styles.header} fixed>
        {logo !== ''&&
        <Image
          style={styles.logo}
          src={logo}
        />
        }
      </View>
      <View style={styles.row}>
        <View style={styles.twoCol}>
          <Text style={styles.text}>Cadidate ID:</Text>
          <Text style={styles.text}>{student?.user?.id}</Text>
          <Text style={styles.text}>Cadidate Name: {student?.user?.firstName}</Text>
          <Text style={styles.text}>Email: {student?.user?.email}</Text>
          <Text style={styles.text}>Mobile: {student?.user?.phone}</Text>
          <Text style={styles.text}>Last Education: Nik</Text>
          <Text style={styles.text}>Last Mark: Nik</Text>
          <Text style={styles.text}>Passout Year: 123456</Text>
          <Text style={styles.text}>Assessment Name: Nik</Text>
          <Text style={styles.text}>Online Test: {student?.exam?.name}</Text>
        </View>
        <View style={styles.twoCol}>
          <Text style={styles.textRight}>Date: {formatYmd(new Date())}</Text>
          <Text style={styles.textRight}>Client Name: {auth?.firstName}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>Overall</Text>
      <View style={styles.row}>
        <View style={styles.threeCol}>
          <Text style={styles.text}>Score: {`${student?.result?.totalCorrect}/${student?.result?.totalQuestion}`}</Text>
          <Text style={styles.text}>Average Score: {`${average?.totalCorrect}/${average?.totalQuestion}`}</Text>
          {/* <Text style={styles.text}>Time Taken:</Text>
          <Text style={styles.text}>97min 6sec / 100min</Text>
          <Text style={styles.text}>Average Time Taken:</Text>
          <Text style={styles.text}>97min 6sec / 100min</Text> */}
        </View>
        <View style={styles.threeCol}>
          {overall !== ''&&
          <Image
            style={styles.speedmeter}
            src={overall}
          />
          }
        </View>
      </View>
      <Text style={styles.title}>Section Analysis</Text>
      {analysis!==''&&
      <Image
        style={styles.analysis}
        src={analysis}
      />
      }
      <Text style={styles.title} break>Section Skill Analysis</Text>
      <Text style={styles.subtitle}>Section 1: Right Brain</Text>
      <View style={styles.row}>
        <View style={styles.twoCol}>
          <Text style={styles.text}>Total Score: {`${student?.result?.right?.totalCorrect}/${student?.result?.right?.totalQuestion}`}</Text>
          <Text style={styles.text}>Average Score: {`${average?.right?.totalCorrect}/${average?.right?.totalQuestion}`}</Text>
        </View>
        <View style={styles.twoCol}>
          {/* <Text style={styles.text}>Time Taken: 20min/20min</Text>
          <Text style={styles.text}>Average Time Taken: 20min/20min</Text> */}
        </View>
      </View>
      <Text style={styles.text}>Question Analysis:</Text>
      {/* <View style={styles.questionRow}>
        <Text style={styles.text}>Total Question: 20</Text>
        <Text style={styles.textGreen}>Correct: 8</Text>
        <Text style={styles.textRed}>Wrong: 9</Text>
        <Text style={styles.textGray}>Skipped: 0</Text>
        <Text style={styles.text}>Not Answered: 3</Text>
      </View> */}
      <View style={styles.table}>
        <View style={styles.thr}>
          <Text style={styles.th1}>Topic</Text>
          <Text style={styles.th1}>Subtopic</Text>
          <Text style={styles.th1}>Number of Questions</Text>
          {/* <Text style={styles.th}>Complexity</Text> */}
          <Text style={styles.th1}>Average Of All Candidates</Text>
          <Text style={styles.tho1}>Candidate Correct Questions</Text>
        </View>
        {
          rightSubtopics.map((subtopic, index) => (
            <View style={styles.tdr} key={index}>
              <Text style={styles.td1}>{subtopic?.topicName}</Text>
              <Text style={styles.td1}>{subtopic?.subTopic?.name}</Text>
              <Text style={styles.td1}>{subtopic?.totalQuestion}</Text>
              {/* <Text style={styles.td}>Complexity</Text> */}
              <Text style={styles.td1}>{subtopic?.average}</Text>
              <Text style={styles.tdo1}>{subtopic?.totalCorrect}</Text>
            </View>
          ))
        }
      </View>

      <Text style={styles.subtitle}>Section 2: Left Brain</Text>
      <View style={styles.row}>
        <View style={styles.twoCol}>
          <Text style={styles.text}>Total Score: {`${student?.result?.left?.totalCorrect}/${student?.result?.left?.totalQuestion}`}</Text>
          <Text style={styles.text}>Average Score: {`${average?.left?.totalCorrect}/${average?.left?.totalQuestion}`}</Text>
        </View>
        <View style={styles.twoCol}>
          {/* <Text style={styles.text}>Time Taken: 20min/20min</Text>
          <Text style={styles.text}>Average Time Taken: 20min/20min</Text> */}
        </View>
      </View>
      <Text style={styles.text}>Question Analysis:</Text>
      {/* <View style={styles.questionRow}>
        <Text style={styles.text}>Total Question: 20</Text>
        <Text style={styles.textGreen}>Correct: 8</Text>
        <Text style={styles.textRed}>Wrong: 9</Text>
        <Text style={styles.textGray}>Skipped: 0</Text>
        <Text style={styles.text}>Not Answered: 3</Text>
      </View> */}
      <View style={styles.table}>
        <View style={styles.thr}>
          <Text style={styles.th1}>Topic</Text>
          <Text style={styles.th1}>Subtopic</Text>
          <Text style={styles.th1}>Number of Questions</Text>
          {/* <Text style={styles.th}>Complexity</Text> */}
          <Text style={styles.th1}>Average Of All Candidates</Text>
          <Text style={styles.tho1}>Candidate Correct Questions</Text>
        </View>
        {
          leftSubtopics.map((subtopic, index) => (
            <View style={styles.tdr} key={index}>
              <Text style={styles.td1}>{subtopic?.topicName}</Text>
              <Text style={styles.td1}>{subtopic?.subTopic?.name}</Text>
              <Text style={styles.td1}>{subtopic?.totalQuestion}</Text>
              {/* <Text style={styles.td}>Complexity</Text> */}
              <Text style={styles.td1}>{subtopic?.average}</Text>
              <Text style={styles.tdo1}>{subtopic?.totalCorrect}</Text>
            </View>
          ))
        }
      </View>
      
      {/* <Text style={styles.title} break>Complexity Level Analysis</Text>
      <View style={styles.table}>
        <View style={styles.thr}>
          <Text style={styles.th1}>Complexity</Text>
          <Text style={styles.th1}>Number of Questions</Text>
          <Text style={styles.th1}>Average Of All Candidates</Text>
          <Text style={styles.tho1}>Candidate Correct Questions</Text>
          <Text style={styles.tho1}>Candidate Correct Percentage</Text>
        </View>
        <View style={styles.tdr}>
          <Text style={styles.td1}>Topic</Text>
          <Text style={styles.td1}>Subtopic</Text>
          <Text style={styles.td1}>12</Text>
          <Text style={styles.tdo1}>Complexity</Text>
          <Text style={styles.tdo1}>12</Text>
        </View>
        <View style={styles.tdr}>
          <Text style={styles.td1}>Topic</Text>
          <Text style={styles.td1}>Subtopic</Text>
          <Text style={styles.td1}>12</Text>
          <Text style={styles.tdo1}>Complexity</Text>
          <Text style={styles.tdo1}>12</Text>
        </View>
      </View> */}
      <Text style={styles.title} break>Proctoring Analysis</Text>
      {/* <Text style={styles.text}>Window Violation: 0</Text>
      <Text style={styles.text}>Time Violation: 0 sec</Text> */}
      {/* <Text style={styles.text}>12 Camera images captured and analysed</Text>
      <Text style={styles.text}>12 Screenshots captured and analysed</Text> */}
      
      <View style={styles.footer} fixed>
        <View style={styles.footerLogo}>
          <Image
            style={styles.logo}
            src="/logo-s.png"
          />
          <Text style={styles.text}>Empowerr</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} />
      </View>
    </Page>
  </Document>
)}
export default PDFDocument
