import { SummaryData } from './summaryData';

const educationReel = {
  Banner: [
    {
      id: 7,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+7/english+7.png',
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-005+-The+Present+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-006+-The+Present+Perfect+Tense.pdf',
        },
      ],
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+7/english+7+-+The+Present+Perfect+Tense.mp4`,
      title: "We Are All Different - and THAT'S AWESOME!",
      info:
        'What is it that makes you different? What makes you jump out of bed? Cole Blakeway, a messy ten year old teaches us the value of celebrating differences as he describes his beautiful friendship',
      isBanner: true,
    },
  ],
  Maths: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+1/maths+1.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+1/maths+1+-+Numbers+to+10000.mp4',
      title: 'Numbers to 10000',
      info: '',
      summary: SummaryData['Maths'][1],
      summaryUrl:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+1/3-M-01-SP-001.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+1/3-M-01-SP-002.pdf',
        },
        {
          title: 'Exercise 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+1/3-M-01-SP-003.pdf',
        },
      ],
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+2/maths+2.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+2/maths+2+-+Visualizing+Numbers+to+10000.mp4',
      title: 'Visualizing Numbers to 10000',
      info: '',
      summary: SummaryData['Maths'][2],
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+2/3-M-01-SP-004.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+2/3-M-01-SP-005.pdf',
        },
        {
          title: 'Exercise 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+2/3-M-01-SP-006.pdf',
        },
      ],
    },
    {
      id: 3,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+3/maths+assessment.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Chocolate+Cake+Latte+Recipe.mp4`,
      title: '-',
      info: '-',
      isAssessment: true,
      isStandalone: true,
    },
    {
      id: 4,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+4/maths+4.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+4/maths+4+-+Reading+and+Writing+Numbers+to+10000.mp4',
      title: 'Reading and Writing Numbers to 10000',
      info: '',
      summary: SummaryData['Maths'][4],
      isAdvertisement: false,
      isMidVideo: true,
      startTime: '1:20',
      startTimeInsec: 80,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+4/3-M-01-SP-007.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+4/3-M-01-SP-008.pdf',
        },
        {
          title: 'Exercise 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+4/3-M-01-SP-009.pdf',
        },
      ],
    },
    {
      id: 5,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+5/maths+5.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+5/maths+5+-+Comparing+and+Ordering+Numbers.mp4',
      title: 'Ordering Numbers',
      info: '',
      summary: SummaryData['Maths'][5],
      isAdvertisement: false,
      isEndVideo: true,
    },
    {
      id: 6,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/maths+6.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/maths+6+-+Reading+Numbers+in+Words.mp4`,
      title: 'Reading Numbers in Words',
      info: '',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/3-M-01-SP-010.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/3-M-01-SP-011.pdf',
        },
        {
          title: 'Exercise 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/3-M-01-SP-012.pdf',
        },
      ],
    },
    {
      id: 7,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+7/maths+7.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+7/maths+7+-+Comparing+and+Ordering+Numbers.mp4',
      title: 'Comparing and Ordering Numbers',
      info: '',
      isAdvertisement: false,
    },
    {
      id: 8,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+8/maths+8.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+8/maths+8+-+Places+Values.mp4',
      title: 'Places Values',
      info: '',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+6/3-M-01-SP-012.pdf',
        },
      ],
    },
    {
      id: 9,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+9/maths+9.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+9/maths+9+-+Place+Values.mp4',
      title: 'Place Values',
      info: '',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+9/3-M-01-SP-020.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+9/3-M-01-SP-021.pdf',
        },
      ],
    },
    {
      id: 10,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+10/maths+10.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+10/maths+10+-+Writing+Numbers+in+Standard+Form.mp4',
      title: 'Writing Numbers in Standard Form',
      info: '',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+10/3-M-01-SP-016.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+10/3-M-01-SP-017.pdf',
        },
        {
          title: 'Exercise 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Maths+Reel/maths+10/3-M-01-SP-018.pdf',
        },
      ],
    },
  ],
  Science: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+1/science+1.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+1/science+1+-+Living+And+Non-Living+Things+part+1.mp4`,
      title: 'Living And Non-Living Things',
      info: 'Learn about the differences between living and non-living things',
      summary: SummaryData['Science'][1],
      summaryUrl:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
      policy: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+2/science+2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+2/science+2+-+Living+And+Non-Living+Things+part+2.mp4`,
      title: 'Sinhala Programming - Basic Lessons 01',
      info: 'Teaches Producing and Beatmaking',
      isAdvertisement: false,
    },
    {
      id: 3,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+3/science+assessment.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Chocolate+Cake+Latte+Recipe.mp4`,
      title: 'Internet Etiquette Assessment',
      info: 'Teaches Acting',
      isAssessment: true,
      isStandalone: true,
    },
    {
      id: 4,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+4/science+4.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+4/science+4+-+Sesame+Street+Who's+Alive.mp4`,
      title: "Sesame Street: Who's Alive?",
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
      isMidVideo: true,
      startTime: '1:20',
      startTimeInsec: 80,
    },
    {
      id: 5,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+5/science+5.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+5/science+5+-+The+Plant+Kingdom+Characteristics+and+Classification.mp4`,
      title: 'The Plant Kingdom: Characteristics and Classification',
      info: 'Classifying plants',
      isAdvertisement: false,
      isEndVideo: true,
    },
    {
      id: 6,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+6/science+6.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+6/science+6+-+Living+or+Non-living+Things+part+3.mp4`,
      title: 'Living or non-living things',
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
    },
    {
      id: 7,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+7/science+7.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+7/science+7+-+Characteristics+of+Living+Things-What+makes+something+alive.mp4`,
      title: 'Characteristics of Living Things-What makes something alive?',
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
    },
    {
      id: 8,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+8/science+8.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+8/science+8+-++Living+or+Non-living+Things+part+4.mp4`,
      title: 'Living and non-living things',
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
    },
    {
      id: 9,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+9/science+9.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+9/science+9+-+It's+Alive!++Biology+for+Kids.mp4`,
      title: "It's Alive! | Biology for Kids",
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
    },
    {
      id: 10,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+10/science+10.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Science+Reel/science+10/science+10+-++Living+or+Non-living+Things+part++5.mp4`,
      title: 'Living and non-living things',
      info: 'Learn about the differences between living and non-living things',
      isAdvertisement: false,
    },
  ],
  English: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/english+1.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/english+1-+The+Simple+Present+Tense.mp4',
      title: 'The Simple Present Tense',
      info: 'Learn the basics of Simple Present Tense',
      summary: SummaryData['English'][1],
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/4-E-GM-001+-+The+Simple+Present+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/4-E-GM-002+-+The+Simple+Present+Tense.pdf',
        },
      ],
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+2/english+2.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/english+4+-+The+Simple+Past+Tense.mp4',
      title: 'The Simple Present Tense',
      info: 'Learn the basics of Simple Present Tense',
      summary: SummaryData['English'][2],
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/4-E-GM-001+-+The+Simple+Present+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+1/4-E-GM-002+-+The+Simple+Present+Tense.pdf',
        },
      ],
    },
    {
      id: 3,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+3/english+assessment.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Chocolate+Cake+Latte+Recipe.mp4`,
      title: '',
      info: '',
      isAssessment: true,
      isStandalone: true,
    },
    {
      id: 4,

      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/english+4.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/english+4+-+The+Simple+Past+Tense.mp4',
      title: 'The Simple Past Tense',
      info: 'Learn the basics of Simple Past Tense',
      summary: SummaryData['English'][4],
      isAdvertisement: false,
      isMidVideo: true,
      startTime: '1:20',
      startTimeInsec: 80,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/4-E-GM-003+-The+SImple+Past+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/4-E-GM-004+-The+SImple+Past+Tense.pdf',
        },
      ],
    },
    {
      id: 5,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+5/english+5.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+5/english+5+-+The+Simple+Past+Tense.mp4',
      title: 'The Simple Past Tense',
      info: 'Learn the basics of Simple Past Tense',
      summary: SummaryData['English'][5],
      isAdvertisement: false,
      isEndVideo: true,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/4-E-GM-003+-The+SImple+Past+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+4/4-E-GM-004+-The+SImple+Past+Tense.pdf',
        },
      ],
    },
    {
      id: 6,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/english+6.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/english+6+-+The+Present+Perfect+Tense.mp4',
      title: 'The Present Perfect Tense',
      info: 'Learn the basics of Present Perfect Tense',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-005+-The+Present+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-006+-The+Present+Perfect+Tense.pdf',
        },
      ],
    },
    {
      id: 7,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+7/english+7.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+7/english+7+-+The+Present+Perfect+Tense.mp4',
      title: 'The Present Perfect Tense',
      info: 'Learn the basics of Present Perfect Tense',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-005+-The+Present+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+6/4-E-GM-006+-The+Present+Perfect+Tense.pdf',
        },
      ],
    },
    {
      id: 8,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/english+8.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/english+8+-+The+Past+Perfect+Tense.mp4',
      title: 'The Past Perfect Tense',
      info: 'Learn the basics of Past Perfect Tense',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-007+-The+Past+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-008+-The+Past+Perfect+Tense.pdf',
        },
      ],
    },
    {
      id: 9,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+9/english+9.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+9/english+9+-+The+Past+Perfect+Tense.mp4',
      title: 'The Past Perfect Tense',
      info: 'Learn the basics of Past Perfect Tense',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-007+-The+Past+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-008+-The+Past+Perfect+Tense.pdf',
        },
      ],
    },
    {
      id: 10,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+10/english+10.png',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+10/english+10+-+The+Past+Perfect+Tense.mp4',
      title: 'The Past Perfect Tense',
      info: 'Learn the basics of Past Perfect Tense',
      isAdvertisement: false,
      policy: [
        {
          title: 'Exercise 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-007+-The+Past+Perfect+Tense.pdf',
        },
        {
          title: 'Exercise 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/English+Reel/english+8/4-E-GM-008+-The+Past+Perfect+Tense.pdf',
        },
      ],
    },
  ],
  Recommended: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand1/mand1.v2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand1/How+to+Graph+a+Quadratic+and+Find+Intercepts%2C+Vertex%2C+%26+Axis+of+Symmetry!.mp4`,
      title: 'How to Graph a Quadratic and Find Intercepts',
      info: 'Teaches Violin',
      policy: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand2/mand2.v2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand2/Sinhala+Programming+Basics+lesson+01.mp4`,
      title: 'Sinhala Programming - Basic Lessons 01',
      info: 'Teaches Producing and Beatmaking',
      isAdvertisement: false,
    },
    {
      id: 3,
      coverImage:
        'https://vtp-thumbnail-images-bucket.s3.ap-south-1.amazonaws.com/CBTL+-+Demo++FInal+images+/CBTL-01-Mandatory-3-Assesment.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Chocolate+Cake+Latte+Recipe.mp4`,
      title: 'Internet Etiquette Assessment',
      info: 'Teaches Acting',
    },
    {
      id: 4,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand4/mand4.v2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand4/WHAT+IS+A+REAL+NUMBER_+WHOLE+NUMBER_+NATURAL+NUMBER_.mp4`,
      title: 'What is a Real Number, Whole Number and Natural Number',
      info: 'Teaches Cooking',
      isAdvertisement: false,
    },
    {
      id: 5,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand5/mand5.v2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Mandatory+1/mand5/Internet+Etiquette_+Netiquette+Guidelines+for+the+Online+Classroom.mp4`,
      title: 'Internet Etiquette',
      info: 'Teach the Art of Magic',
      isAdvertisement: false,
    },
  ],
  Featured: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Banner+1.jpg',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Studying+for+Exams_+Crash+Course+Study+Skills+%237.mp4',
      title: 'Studying for Exams',
      info:
        'It turns out that saving all of your studying until after midnight on the night before your big exam is not actually a great way to prepare. Today, Thomas explains some test prep strategies that actually work.',
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Featured/featured+2/featured+2.png',
      sampleAnimation: `https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Featured/featured+2/We+Are+All+Different+-+and+THAT'S+AWESOME!+_+Cole+Blakeway+_+TEDxWestVancouverED.mp4`,
      title: "We Are All Different - and THAT'S AWESOME!",
      info: `What is it that makes you different? What makes you jump out of bed? Cole Blakeway, a messy ten year old teaches us the value of celebrating differences as he describes his beautiful friendship with Steven, a 44 year old man with Autism. In a world that gravitates to being the same, Cole Blakeway reminds us that we are all different and that's awesome!`,
      isAdvertisement: false,
    },
    {
      id: 3,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Featured/featured+3/featured+3.png',
      title: 'Sign up for Model United Nations',
      info: '',
      isAdvertisement: false,
      isImage: true,
    },
    {
      id: 4,
      coverImage:
        'https://vtp-thumbnail-images-bucket.s3.ap-south-1.amazonaws.com/CBTL+-+Demo++FInal+images+/CBTL-03-Featured-4-covid.png',
      title: 'The latest status on the COVID-19 Pandemic - Ministry of Health Sri Lanka',
      info: '',
      isAdvertisement: false,
      link: 'http://www.epid.gov.lk/web/index.php?option=com_content&view=article&id=228&lang=en',
    },
  ],
  DocumentReel: [
    {
      id: 1,
      coverImage: 'https://cb-policy-images.s3.ap-south-1.amazonaws.com/Technology%20Usage.jpg',
      title: 'Mathematics',
      documents: [
        {
          title: 'Numbers to 10 000 (MCQ Questions) Part 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-MC-001.pdf',
        },
        {
          title: 'Numbers to 10 000 (MCQ Questions) Part 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-MC-002.pdf',
        },
        {
          title: 'Numbers to 10 000 (MCQ Questions) Part 3',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-MC-003.pdf',
        },
        {
          title: 'Numbers to 10 000 (Short Answer Questions) Part 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-OE-001.pdf',
        },
        {
          title: 'Numbers to 10 000 (Short Answer Questions) Part 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-OE-002.pdf',
        },
        {
          title: 'Numbers to 10 000 (Long Answer Questions) Part 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-WP-001.pdf',
        },
        {
          title: 'Numbers to 10 000 (Long Answer Questions) Part 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Documents/Mathematics+category/3-M-01-WP-002.pdf',
        },
      ],
    },
    {
      id: 2,
      coverImage: 'https://cb-policy-images.s3.ap-south-1.amazonaws.com/Health%20and%20Safety.jpg',
      title: 'Science',
      documents: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
    {
      id: 3,
      coverImage: 'https://cb-policy-images.s3.ap-south-1.amazonaws.com/Human%20Resource.jpg',
      title: 'English',
      documents: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
    {
      id: 4,
      coverImage: 'https://cb-policy-images.s3.ap-south-1.amazonaws.com/Employee+Conduct.jpeg',
      title: 'Revision',
      documents: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
    {
      id: 5,
      coverImage: 'https://cb-policy-images.s3.ap-south-1.amazonaws.com/Pay%20and%20Benefits.jpg',
      title: 'Formula sheets',
      documents: [
        {
          title: 'O/L Math Past Paper 2018',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 1',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
        {
          title: 'Quadratic Worksheet 2',
          pdf:
            'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Past+Papers/Ordinary+Level+Math+Past+Paper+2018.pdf',
        },
      ],
    },
  ],
  interview: [
    {
      id: 1,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Banner+1.jpg',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Studying+for+Exams_+Crash+Course+Study+Skills+%237.mp4',
      title: 'Studying for Exams',
      info:
        'It turns out that saving all of your studying until after midnight on the night before your big exam is not actually a great way to prepare. Today, Thomas explains some test prep strategies that actually work.',
    },
    {
      id: 2,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Banner+1.jpg',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Studying+for+Exams_+Crash+Course+Study+Skills+%237.mp4',
      title: 'Studying for Exams',
      info:
        'It turns out that saving all of your studying until after midnight on the night before your big exam is not actually a great way to prepare. Today, Thomas explains some test prep strategies that actually work.',
    },
    {
      id: 3,
      coverImage:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Banner+1.jpg',
      sampleAnimation:
        'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Education/Banner/banner1/Studying+for+Exams_+Crash+Course+Study+Skills+%237.mp4',
      title: 'Studying for Exams',
      info:
        'It turns out that saving all of your studying until after midnight on the night before your big exam is not actually a great way to prepare. Today, Thomas explains some test prep strategies that actually work.',
    },
  ],
};

let reels = educationReel;

export { reels };
