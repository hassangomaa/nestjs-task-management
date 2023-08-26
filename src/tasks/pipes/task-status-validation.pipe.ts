import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
    // The transform method is called whenever a value is passed through the pipe
    // The transform method must return the value transformed
    // The transform method receives two arguments: the value and the metadata
    // The metadata is an argument of type ArgumentMetadata
    // The ArgumentMetadata interface has two properties: type and meta
    // The type property is a string that represents the type of the value
    // The meta property is an object that contains additional information about the value
    // The transform method can throw an exception
    // The transform method can be asynchronous
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
        }
    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}