import { jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Link, Image, CuteHR } from '../particles';
import { projectsCss } from './projectsCss';

export const Projects = () => (
  <FlexContainer
    _css={projectsCss}
    flexDirection='column'
    alignItems='center'
  >
    <h1>MY PROJECTS</h1>
    <CuteHR />

    <FlexContainer className='project'>
      <Link href='/cube'>
        <Image src='cube.png' height={150} width={200} />
      </Link>
      <FlexContainer flexDirection='column' alignItems='flex-start' className='description'>
        <h3>Cat's Cubing Page (2019)</h3><br />
        <h4>
          A tool for exploring patterns in speedcubing algorithms. The app can sort and filter algorithms based on common move sequences and more.<br />
          <span className='link'>
            <Link href='https://github.com/kaaaata/portfolio/tree/master/src/components/cube'>Repo</Link>
          </span>
        </h4>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer className='project'>
      <Link href='http://catsbig2.herokuapp.com'>
        <Image src='big2.png' height={150} width={200} />
      </Link>
      <FlexContainer flexDirection='column' alignItems='flex-start' className='description'>
        <h3>Big 2 (2018)</h3><br />
        <h4>
          A web clone of Big 2, a popular Chinese card game. Has both AI and online play. Sometimes crashes.<br />
          <span className='link'>
            <Link href='https://github.com/kaaaata/big-2'>Repo</Link>
          </span>
        </h4>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer className='project'>
      <Link href='http://jellyfishapp.herokuapp.com/'>
        <Image src='jelly.png' height={150} width={200} />
      </Link>
      <FlexContainer flexDirection='column' alignItems='flex-start' className='description'>
        <h3>Jelly (2017)</h3><br />
        <h4>
          A terminal clone for navigating the web.... Click the jellyfish to create aliases and use them to browse the internet!<br />
          <span className='link'>
            <Link href='https://github.com/kaaaata/jelly'>Repo</Link>
          </span>
        </h4>
      </FlexContainer>
    </FlexContainer>

    <h5>Note: some of these projects may take up to 30 seconds to load. It's not a code bug, it's because I'm trying to save money by using free dynos on Heroku, which go to sleep after a period of inactivity...</h5>
    
  </FlexContainer>
);
