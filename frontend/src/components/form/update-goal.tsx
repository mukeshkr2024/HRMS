import { useGetGoal } from '@/api/goals/use-get-goal'
import { AddNewPopup } from '../popup/add-new-popup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { useAddComment } from '@/api/goals/comment/use-add-comment'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useUpdateGoalProgress } from '@/api/goals/use-update-goalProgress'

interface UpdateGoalProps {
    goalId: string
    setIsEditing: (value: string | null) => void
}

export const UpdateGoal = ({ goalId, setIsEditing }: UpdateGoalProps) => {
    const [progress, setProgress] = useState<number>(0)
    const { data: goal } = useGetGoal(goalId)

    useEffect(() => {
        if (goal?.progress) {
            setProgress(goal.progress)
        }
    }, [goal])

    const addCommentMutation = useAddComment(goalId)
    const updateGoalProgressMutation = useUpdateGoalProgress(goalId)

    const handleAddComment = (values: { title: string }) => {
        addCommentMutation.mutate(values)
    }

    const handleUpdateProgress = () => {
        console.log('Updated progress:', progress)
        // You can add mutation logic here to persist the updated progress to the backend
        updateGoalProgressMutation.mutate({
            progress
        }, {
            onSuccess: () => {
                setIsEditing(null)
            }
        })
    }

    return (
        <Card>
            <CardHeader className='space-y-4'>
                {/* <p className='text-sm text-red-500 font-semibold'>Created: {formatDate(goal?.createdAt)} - Due: {formatDate(goal?.dueDate)}</p> */}
                <CardTitle>{goal?.title}</CardTitle>
                <CardDescription>{goal?.description}</CardDescription>
                <CardContent className='p-0'>
                    <div className='mt-4'>
                        <div className="flex items-end w-full justify-between">
                            <div>
                                <span className="text-[#404040] font-bold text-5xl">{progress}%</span>
                                <span className="text-[#404040] text-sm pl-2">COMPLETE</span>
                            </div>
                            <div className='flex items-center gap-4 mb-2'>
                                <span>Status:</span>
                                <div className='flex items-center gap-2.5'>
                                    <Input
                                        className='w-20 h-9'
                                        type='number'
                                        value={progress}
                                        onChange={(e) => setProgress(Number(e.target.value))}
                                    />
                                    <Button className='h-9' onClick={handleUpdateProgress}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Progress value={progress} className="h-2" />
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
                                <div className='text-muted-foreground text-center'>No Comments yet</div>
                            )}
                        </div>
                    </div>
                    <div className='bg-[#F5F5F5] mt-8 h-14 flex items-center justify-center text-[#333333] rounded-md font-semibold text-lg'>
                        <AddNewPopup
                            label='New Comment'
                            buttonLabel='Add Comment'
                            className='w-[450px]'
                            onSubmit={handleAddComment}
                        />
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}