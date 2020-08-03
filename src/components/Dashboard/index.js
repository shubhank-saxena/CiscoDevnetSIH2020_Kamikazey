import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import {
  Flex,
  Heading,
  HugeHeading,
  SubHeading,
  Paragraph,
} from '../../styles/globalStyles';
import history from '../../services/history';
import useWindowSize from '../../hooks/useWindowSize';
import { connect, useSelector } from 'react-redux';
import data from '../../constants/lang';
import req from '../../requests';

const schools = [
  {
    name: 'School 1',
    zilla: 'Fbd',
    principal: 'Jaskee',
    noOfStudents: '300',
    noOfWorkers: '100',
    schoolId: '1',
  },
  {
    name: 'School 2',
    zilla: 'Mum',
    principal: 'Jaskee',
    noOfStudents: '300',
    noOfWorkers: '200',
    schoolId: '2',
  },
  {
    name: 'School 3',
    zilla: 'Chdg',
    principal: 'Jaskee',
    noOfStudents: '350',
    noOfWorkers: '150',
    schoolId: '3',
  },
];

function Dash({ lang }) {
  const size = useWindowSize();
  const [Schools, setSchools] = useState(null);
  const [CardLoading, setCardLoading] = useState(false);

  const { token } = useSelector(state => {
    return { ...state.auth };
  });
  const [gridStyle, setGridStyle] = useState({
    width: '30%',
    textAlign: 'center',
    margin: '20px',
  });

  useEffect(() => {
    setGridStyle({
      ...gridStyle,
      width: `${size.width < 600 ? '100%' : '33%'}`,
      margin: `${size.width > 1440 ? 'auto' : 'auto'}`,
    });
  }, [size]);

  useEffect(() => {
    getAllSchools();
  }, []);

  const getAllSchools = () => {
    setCardLoading(true);
    req.School.getAllSchools(token)
      .then(json => {
        console.log(json);
        setSchools(json);
      })
      .finally(() => setCardLoading(false));
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '5vh' }}>
      {console.log(gridStyle.width)}
      <HugeHeading style={{ width: '100%' }}>
        {data[lang]['DASHBOARD']['HEADER']}
      </HugeHeading>
      <Card style={{ border: 'none' }} loading={CardLoading}>
        {Schools
          ? Schools.map((school, key) => {
              return (
                <Card.Grid
                  key={key}
                  style={gridStyle}
                  onClick={() => {
                    history.push(`/school/${school.organisation_id}`);
                  }}
                >
                  <Flex style={{ marginBottom: '2em' }} spaceBetween>
                    <Heading>{school.name}</Heading>
                    <Paragraph>{school.zilla}</Paragraph>
                  </Flex>
                  <Flex>
                    <SubHeading>
                      {' '}
                      {data[lang]['DASHBOARD']['PRINCIPAL']}
                    </SubHeading>
                    <Paragraph>{`: ${school.principal.first_name} ${school.principal.last_name}`}</Paragraph>
                  </Flex>
                  <Flex>
                    <SubHeading> {data[lang]['DASHBOARD']['NOS']}</SubHeading>
                    <Paragraph>{`: ${school.students_count}`}</Paragraph>
                  </Flex>
                  <Flex>
                    <SubHeading> {data[lang]['DASHBOARD']['NOW']}</SubHeading>
                    <Paragraph>{`: ${school.workers_count}`}</Paragraph>
                  </Flex>
                  <Button style={{ marginTop: '20px' }}>
                    {' '}
                    {data[lang]['DASHBOARD']['BTN_TEXT']}
                  </Button>
                </Card.Grid>
              );
            })
          : null}
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lang: state.gen.lang,
  };
};

export default connect(mapStateToProps)(Dash);
