import { useGetGoal } from '@/api/goals/use-get-goal'
import { AddNewPopup } from '../popup/add-new-popup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { useAddComment } from '@/api/goals/comment/use-add-comment'


interface UpdateGoalProps {
    goalId: string
    setIsEditing: (value: string) => void
}

export const UpdateGoal = ({ goalId }: UpdateGoalProps) => {
    const {
        data: goal
    } = useGetGoal(goalId)

    console.log(goal);


    const addCommentMutation = useAddComment(goalId)

    const handleAddComment = (values: {
        title: string
    }) => {
        console.log(values);
        addCommentMutation.mutate(values)
    }


    return (
        <Card>
            <CardHeader className='space-y-4'>
                <p className='text-sm text-red-500 font-semibold'>Created: {(goal?.createdAt)} - Due: {goal?.update}</p>
                <CardTitle>
                    {
                        goal?.title
                    }
                </CardTitle>
                <CardDescription>
                    {
                        goal?.description
                    }
                </CardDescription>
                <CardContent className='p-0'>
                    <div className='mt-4'>
                        <div className="flex items-end">
                            <span className="text-[#404040] font-bold text-5xl">{goal?.progress}%</span>
                            <span className="text-[#404040] text-sm pl-2">COMPLETE</span>
                        </div>
                        <Progress value={goal?.progress} className="h-2" />
                    </div>
                    <div className='mt-8'>
                        <div className='bg-[#F5F5F5] h-14 flex items-center justify-center text-[#333333] rounded-md font-semibold text-lg'>
                            <h3>Comments</h3>
                        </div>

                        <div className='flex gap-y-4 flex-col mt-5'>
                            {goal?.comments?.length > 0 ? (
                                goal.comments.map((comment: any) => (
                                    <div key={comment._id} className='flex gap-2.5 mt-2'>
                                        <img src="/icons/avatar-icon.svg" alt="" className='w-[40px] h-[40px]' />
                                        <div>
                                            <h3>{comment?.addedBy?.firstName} {comment?.addedBy?.lastName}</h3>
                                            <p className='text-muted-foreground text-sm'>{comment?.title}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No Comments found</div>
                            )}
                        </div>
                    </div>
                    <div className='bg-[#F5F5F5] mt-8 h-14 flex items-center justify-center text-[#333333] rounded-md font-semibold text-lg'>
                        <AddNewPopup
                            label='New Comment'
                            buttonLabel='Add Comment'
                            className='w-[450px]'
                            onSubmit={
                                handleAddComment
                            }
                        />
                    </div>
                </CardContent>
            </CardHeader>
        </Card >
    )
}
