import part from './part'
import course from './course'
import lesson from './lesson'
import prompts from './prompts'
import aiop, {aiopBodyItem, aiopCourse} from './aiop'
import aiTools from './aiTools'
import aiGuide, {aiGuideBodyItem, aiGuideCourse} from './aiGuide'
import challenges, {challengeDayItem} from './challenges'

export const schemaTypes = [part, course, lesson, prompts, aiop, aiopBodyItem, aiopCourse, aiTools, aiGuide, aiGuideBodyItem, aiGuideCourse, challenges, challengeDayItem]
