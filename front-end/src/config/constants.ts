export const loginVideoUrl =
  'https://video-cofee-bean-bucket.s3-ap-southeast-1.amazonaws.com/Knodify/Login+Page/login--video.mp4';

export const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const nameRegex = /^[A-Za-z ]+$/;
export const addressRegex = /^[A-Za-z0-9-/ ]+$/;

export const notificationType = {
  ASSESSMENT_RESPONSE_ATTEMPT_CREATE: 'ASSESSMENT_RESPONSE_ATTEMPT_CREATE',
  ASSESSMENT_RESPONSE_ATTEMPT_SUBMIT: 'ASSESSMENT_RESPONSE_ATTEMPT_SUBMIT',
  ASSESSMENT_RESPONSE_ATTEMPT_UPDATE: 'ASSESSMENT_RESPONSE_ATTEMPT_UPDATE',
  CREATE_REMINDER_SETTINGS: 'USER_NOTIFICATION_SETTING_CREATE',
  REMAINDER: 'USER_NOTIFICATION_CREATE',
  REMOVE_WATCH_LATER: 'USER_NOTIFICATION_SETTING_DELETE',
  SUCCESS: 'SUCCESS',
  USER_REACTION_CREATE: 'USER_REACTION_CREATE',
  USER_REACTION_UPDATE: 'USER_REACTION_UPDATE',
  USER_SPECIFIC_VIDEO_SUMMARY_CREATE: 'USER_SPECIFIC_VIDEO_SUMMARY_CREATE',
  USER_SPECIFIC_VIDEO_SUMMARY_UPDATE: 'USER_SPECIFIC_VIDEO_SUMMARY_UPDATE',
  USER_SUBSCRIPTION_CREATE: 'USER_SUBSCRIPTION_CREATE',
  VIDEO_SUMMARY_DELETE: 'VIDEO_SUMMARY_DELETE',
  USER_UPDATE: 'USER_UPDATE',
};
// Subject  Reducer

export const subjectsConstant = {
  subjectsTotalRecords: 0,
  subjectsPage: 1,
  subjectsPerPage: 10,
};

export const tutorsConstant = {
  tutorVideosPage: 1,
  tutorVideosPerPage: 10,
  tutorsPage: 1,
  tutorsPerPage: 10,
};
export const syllabusesConstant = {
  syllabusTotalRecords: 0,
  syllabusPage: 1,
  syllabusPerPage: 20,
};

export const gradeConstant = {
  gradeTotalRecords: 0,
  gradePage: 1,
  gradePerPage: 20,
};

export const productConstant = {
  products: {},
  productTotalRecords: 0,
  productPage: 1,
  productSize: 10,
};

export const subscriptionConstant = {
  subscriptions: {},
  subscriptionTotalRecords: 0,
  subscriptionPage: 1,
  subscriptionSize: 10,
};

export const subscriptionPaymentCycle = {
  daily: 'DAILY',
  weekly: 'BI_WEEKLY',
  monthly: 'MONTHLY',
  annually: 'ANNUALLY',
};

export const videosConstant = {
  videosPage: 1,
  videosPerPage: 10,
};

export const userRoles = {
  student: 'ROLE_STUDENT',
  admin: 'ROLE_ADMIN',
};

export const userTypes = {
  student: 'STUDENT',
  parent: 'PARENT',
  tutor: 'TUTOR',
  admin: 'ADMIN',
};

export const contentType = {
  assignment: 'LEARNING_ASSESSMENT',
  video: 'LEARNING_VIDEO',
  document: 'LEARNING_DOCUMENT',
  linkedDocument: 'LEARNING_LINKED_DOCUMENT',
  pastPaperDocument: 'LEARNING_DOCUMENT_PASTPAPER',
  linkedDocumentPastPaper: 'LEARNING_LINKED_DOCUMENT_PASTPAPER',
  interviewVideo: 'INTERVIEW_VIDEO',
};

export const pastPaperConstant = {
  month: 'month',
  year: 'year',
};

export const trialPeriod = [
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' },
];

export const contentAccessType = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
];

export const responseType = {
  arraybuffer: 'arraybuffer',
};

const env = process.env.REACT_APP_ENV;

let environment = {
  CONTENT_SERVICE: `content-service-${env}`,
  PAYMENT_SERVICE: `payment-service-${env}`,
  PRODUCT_CONTENT_SERVICE: `product-content-service-${env}`,
  PRODUCT_SERVICE: `product-service-${env}`,
  USER_SERVICE: `user-service-${env}`,
  USER_NOTIFICATION_SERVICE: `user-notification-service-${env}`,
  USER_CONTENT_SERVICE: `user-content-service-${env}`,
};

export const CONTENT_SERVICE = environment.CONTENT_SERVICE;
export const PAYMENT_SERVICE = environment.PAYMENT_SERVICE;
export const PRODUCT_CONTENT_SERVICE = environment.PRODUCT_CONTENT_SERVICE;
export const PRODUCT_SERVICE = environment.PRODUCT_SERVICE;
export const USER_SERVICE = environment.USER_SERVICE;
export const USER_NOTIFICATION_SERVICE = environment.USER_NOTIFICATION_SERVICE;
export const USER_CONTENT_SERVICE = environment.USER_CONTENT_SERVICE;

export const TIMER = 20000;

export const ADMIN_MENU_LIST = [
  [
    {
      title: 'User Management',
      path: '/admin/user-management',
      identifer: 'userManagement',
    },
    {
      title: 'Master List',
      path: '#',
      identifer: 'masterList',
    },
  ],
  [
    {
      title: 'Product',
      path: '/admin/products',
      identifer: 'product',
    },
    {
      title: 'Statistics',
      path: '#',
      identifer: 'statistics',
    },
    {
      title: 'Subscription',
      path: '/admin/subscription',
      identifer: 'subscription',
    },
  ],
];

export const PRODUCT_PROGRESS_BAR_MENU_LIST = [
  `Basic Information`,
  `Add Content`,
  `Feature Reel`,
  `Tutors`,
  `Subscriptions`,
  `Access Control`,
];

export const cloudStoragePath = {
  learningMaterials: 'learning-materials',
};
export const Header_Types = {
  Home: 'Home',
  Tutors: 'Tutors',
  Products: 'Products',
  Requests: 'Requests',
};
export const QUESTION_TYPE = {
  SINGLE_ANSWER_MCQ: 'SINGLE_ANSWER_MULTIPLE_CHOICE_QUESTION',
  SINGLE_ANSWER_MCQ_WITHIMAGE:
    'SINGLE_ANSWER_MULTIPLE_CHOICE_QUESTION_WITH_IMAGE',
};
export const SocketTasks = {
  USER_UPDATE: 'USER_UPDATE',
};
export const SocketStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};
export const SocketRedirect = {
  USER_VIEW: 'user_view',
  HOME: 'home',
};
export const CartAction = {
  ADD_CART: 'add_cart',
  REMOVE_CART: 'remove_cart',
};

export const PAYMENT_CYCLE = {
  DAILY: 'DAILY',
  BI_WEEKLY: 'BI_WEEKLY',
  MONTHLY: 'MONTHLY',
  ANNUALLY: 'ANNUALLY',
};

export const SUBSCRIPTION_TYPE = {
  TRIAL_BASED: 'TRIAL_BASED',
  DURATION_BASED: 'DURATION_BASED',
};

export const overlayDisplayDuration = 3000; //in ms

export const UserManagementTabTypes = {
  ALL: 'ALL',
  STUDENTS: 'STUDENTS',
  PARENTS: 'PARENTS',
  TUTORS: 'TUTORS',
  ADMINS: 'ADMINS',
};

export const UserManagementURLTabTypes = {
  TUTORS: 'tutors',
};

export const USER_MANAGEMENT_PAGE_SIZE = 15;

export const OrderByFieldNames = {
  VIDEO: 'subjectTopicTutorVideoOrder',
  DOCUMENT:
    'subjectTopicTutorDocumentLinkDocumentDocumentPastPaperLinkDocumentPastPaperOrder',
  ASSESSMENT: 'subjectTopicTutorAssessmentOrder',
};
export const assessmentType = {
  MID_VIDEO_ASSESSMENT: 'MID_VIDEO_ASSESSMENT',
};

export const ReelTypes = {
  STANDARD: 'STANDARD',
  FEATURED: 'FEATURED',
};
export const ReelContentOrderTypes = {
  RANDOM_ORDER: 'RANDOM_CONTENT_ORDER',
};

export const ContentSelectionTypes = {
  ALL_CONTENTS_FROM_ALL_TUTORS: 'ALL_CONTENTS_FROM_ALL_TUTORS',
  ALL_CONTENTS_FROM_SELECTED_TUTORS: 'ALL_CONTENTS_FROM_SELECTED_TUTORS',
  SELECTED_CONTENT: 'SELECTED_CONTENT',
  ALL_VIDEO_FROM_SELECTED_TUTORS: 'ALL_VIDEO_FROM_SELECTED_TUTORS',
  ALL_DOCUMENT_FROM_SELECTED_TUTORS: 'ALL_DOCUMENT_FROM_SELECTED_TUTORS',
  ALL_ASSESSMENT_FROM_SELECTED_TUTORS: 'ALL_ASSESSMENT_FROM_SELECTED_TUTORS',
  ALL_CONTENTS_FROM_ALL_TUTORS_EXCEPT_UNSELECTED_CONTENTS:
    'ALL_CONTENTS_FROM_ALL_TUTORS_EXCEPT_UNSELECTED_CONTENTS',
  ALL_CONTENTS_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_CONTENTS:
    'ALL_CONTENTS_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_CONTENTS',
  ALL_VIDEO_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_VIDEOS:
    'ALL_VIDEO_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_VIDEOS',
  ALL_DOCUMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_DOCUMENTS:
    'ALL_DOCUMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_DOCUMENTS',
  ALL_ASSESSMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_ASSESSMENTS:
    'ALL_ASSESSMENT_FROM_SELECTED_TUTORS_EXCEPT_UNSELECTED_ASSESSMENTS',
};

export const currencyCode: any = {
  USD: '$',
};

export const AccountStatus = {
  ACCEPTED: 'ACCEPTED',
};
