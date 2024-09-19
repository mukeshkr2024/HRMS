import { useGetGoal } from '@/api/goals/use-get-goal'
import { AddNewPopup } from '../popup/add-new-popup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { useAddComment } from '@/api/goals/comment/use-add-comment'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useUpdateGoalProgress } from '@/api/goals/use-update-goalProgress'
import { formatDate } from '@/utils'
import { Loader } from 'lucide-react'
import { UserAvatar } from '../shared/user-avatar'

interface UpdateGoalProps {
    goalId: string
    setIsEditing: (value: string | null) => void
}

export const UpdateGoal = ({ goalId, setIsEditing }: UpdateGoalProps) => {
    const [progress, setProgress] = useState<number>(0)
    const { data: goal, isLoading } = useGetGoal(goalId)

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
        // Ensure progress is within 0-100 range
        const clampedProgress = Math.min(Math.max(progress, 0), 100)
        console.log('Updated progress:', clampedProgress)
        updateGoalProgressMutation.mutate({
            progress: clampedProgress
        }, {
            onSuccess: () => {
                setIsEditing(null)
            }
        })
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        // Ensure value is within 0-100 range
        if (value >= 0 && value <= 100) {
            setProgress(value)
        }
    }

    if (isLoading) {
        return <div className='flex w-full h-full items-center justify-center'>
            <Loader
                className='text-muted-foreground animate-spin'
            />
        </div>
    }

    return (
        <Card className='mt-4'>
            <CardHeader className='space-y-4'>
                <div className='flex w-full justify-between items-center'>
                    <p className='text-sm text-red-500 font-semibold'>Created: {formatDate(goal?.createdAt)} - Due: {formatDate(goal?.dueDate)}</p>
                    <Button
                        variant="addAction"
                        className='h-9 font-semibold px-6'
                        onClick={() => setIsEditing(null)}
                    >Close</Button>
                </div>
                <CardTitle>{goal?.title}</CardTitle>
                <CardDescription>{goal?.description}</CardDescription>
                <CardContent className='p-0'>
                    <div className='mt-4'>
                        <div className="flex flex-col sm:flex-row items-end w-full justify-between">
                            <div className="mb-4 sm:mb-0">
                                <span className="text-[#404040] font-bold text-3xl sm:text-5xl">{progress}%</span>
                                <span className="text-[#404040] text-sm pl-2">COMPLETE</span>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-4 mb-2'>
                                <span>Status:</span>
                                <div className='flex items-center gap-2.5'>
                                    <Input
                                        className='w-full sm:w-20 h-9'
                                        type='number'
                                        value={progress}
                                        onChange={handleProgressChange}
                                    />
                                    <Button className='h-9 w-full sm:w-auto' onClick={handleUpdateProgress}>
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
                                    <div key={comment._id} className='flex gap-2.5 mt-2 items-center '>
                                        <UserAvatar
                                            avatar={comment?.addedBy?.avatar}
                                            name={comment?.addedBy?.name}
                                            className='w-[40px] h-[40px]'
                                        />
                                        <div>
                                            <h3 className='text-[#242424] font-semibold font-urbanist'>{comment?.addedBy?.name} </h3>
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
                            className='w-[320px] sm:w-[450px]'
                            onSubmit={handleAddComment}
                        />
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}
